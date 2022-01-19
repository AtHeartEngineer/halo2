use super::super::{EccPoint, EccScalarFixed, OrchardFixedBasesFull};

use crate::{
    circuit::gadget::utilities::range_check,
    constants::{self, util, L_ORCHARD_SCALAR, NUM_WINDOWS},
};
use arrayvec::ArrayVec;
use halo2::{
    circuit::{AssignedCell, Layouter, Region},
    plonk::{ConstraintSystem, Error, Selector},
    poly::Rotation,
};
use pasta_curves::pallas;

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct Config {
    q_mul_fixed_full: Selector,
    super_config: super::Config,
}

impl Config {
    pub(crate) fn configure(
        meta: &mut ConstraintSystem<pallas::Base>,
        super_config: super::Config,
    ) -> Self {
        let config = Self {
            q_mul_fixed_full: meta.selector(),
            super_config,
        };

        config.create_gate(meta);

        config
    }

    fn create_gate(&self, meta: &mut ConstraintSystem<pallas::Base>) {
        // Check that each window `k` is within 3 bits
        meta.create_gate("Full-width fixed-base scalar mul", |meta| {
            let q_mul_fixed_full = meta.query_selector(self.q_mul_fixed_full);
            let window = meta.query_advice(self.super_config.window, Rotation::cur());

            self.super_config
                .coords_check(meta, q_mul_fixed_full.clone(), window.clone())
                .into_iter()
                // Constrain each window to a 3-bit value:
                // 1 * (window - 0) * (window - 1) * ... * (window - 7)
                .chain(Some((
                    "window range check",
                    q_mul_fixed_full * range_check(window, constants::H),
                )))
        });
    }

    /// Witnesses the given scalar as `NUM_WINDOWS` 3-bit windows.
    ///
    /// The scalar is allowed to be non-canonical.
    fn witness(
        &self,
        region: &mut Region<'_, pallas::Base>,
        offset: usize,
        scalar: Option<pallas::Scalar>,
    ) -> Result<EccScalarFixed, Error> {
        let windows = self.decompose_scalar_fixed::<L_ORCHARD_SCALAR>(scalar, offset, region)?;

        Ok(EccScalarFixed {
            value: scalar,
            windows,
        })
    }

    /// Witnesses the given scalar as `NUM_WINDOWS` 3-bit windows.
    ///
    /// The scalar is allowed to be non-canonical.
    fn decompose_scalar_fixed<const SCALAR_NUM_BITS: usize>(
        &self,
        scalar: Option<pallas::Scalar>,
        offset: usize,
        region: &mut Region<'_, pallas::Base>,
    ) -> Result<ArrayVec<AssignedCell<pallas::Base, pallas::Base>, NUM_WINDOWS>, Error> {
        // Enable `q_mul_fixed_full` selector
        for idx in 0..NUM_WINDOWS {
            self.q_mul_fixed_full.enable(region, offset + idx)?;
        }

        // Decompose scalar into `k-bit` windows
        let scalar_windows: Option<Vec<u8>> = scalar.map(|scalar| {
            util::decompose_word::<pallas::Scalar>(
                &scalar,
                SCALAR_NUM_BITS,
                constants::FIXED_BASE_WINDOW_SIZE,
            )
        });

        // Store the scalar decomposition
        let mut windows: ArrayVec<AssignedCell<pallas::Base, pallas::Base>, NUM_WINDOWS> =
            ArrayVec::new();

        let scalar_windows: Vec<Option<pallas::Base>> = if let Some(windows) = scalar_windows {
            assert_eq!(windows.len(), NUM_WINDOWS);
            windows
                .into_iter()
                .map(|window| Some(pallas::Base::from(window as u64)))
                .collect()
        } else {
            vec![None; NUM_WINDOWS]
        };

        for (idx, window) in scalar_windows.into_iter().enumerate() {
            let window_cell = region.assign_advice(
                || format!("k[{:?}]", offset + idx),
                self.super_config.window,
                offset + idx,
                || window.ok_or(Error::Synthesis),
            )?;
            windows.push(window_cell);
        }

        Ok(windows)
    }

    pub fn assign(
        &self,
        mut layouter: impl Layouter<pallas::Base>,
        scalar: Option<pallas::Scalar>,
        base: OrchardFixedBasesFull,
    ) -> Result<(EccPoint, EccScalarFixed), Error> {
        let (scalar, acc, mul_b) = layouter.assign_region(
            || "Full-width fixed-base mul (incomplete addition)",
            |mut region| {
                let offset = 0;

                let scalar = self.witness(&mut region, offset, scalar)?;

                let (acc, mul_b) = self
                    .super_config
                    .assign_region_inner::<{ constants::NUM_WINDOWS }>(
                        &mut region,
                        offset,
                        &(&scalar).into(),
                        base.into(),
                        self.q_mul_fixed_full,
                    )?;

                Ok((scalar, acc, mul_b))
            },
        )?;

        // Add to the accumulator and return the final result as `[scalar]B`.
        let result = layouter.assign_region(
            || "Full-width fixed-base mul (last window, complete addition)",
            |mut region| {
                self.super_config.add_config.assign_region(
                    &mul_b.clone().into(),
                    &acc.clone().into(),
                    0,
                    &mut region,
                )
            },
        )?;

        #[cfg(test)]
        // Check that the correct multiple is obtained.
        {
            use group::Curve;

            let base: super::OrchardFixedBases = base.into();
            let real_mul = scalar.value.map(|scalar| base.generator() * scalar);
            let result = result.point();

            if let (Some(real_mul), Some(result)) = (real_mul, result) {
                assert_eq!(real_mul.to_affine(), result);
            }
        }

        Ok((result, scalar))
    }
}

#[cfg(test)]
pub mod tests {
    use group::{ff::Field, Curve};
    use halo2::{circuit::Layouter, plonk::Error};
    use pasta_curves::pallas;
    use rand::rngs::OsRng;

    use crate::circuit::gadget::ecc::{
        chip::{EccChip, OrchardFixedBasesFull},
        FixedPoint, NonIdentityPoint, Point,
    };
    use crate::constants;

    pub fn test_mul_fixed(
        chip: EccChip,
        mut layouter: impl Layouter<pallas::Base>,
    ) -> Result<(), Error> {
        // commit_ivk_r
        let commit_ivk_r = OrchardFixedBasesFull::CommitIvkR;
        test_single_base(
            chip.clone(),
            layouter.namespace(|| "commit_ivk_r"),
            FixedPoint::from_inner(chip.clone(), commit_ivk_r),
            commit_ivk_r.generator(),
        )?;

        // note_commit_r
        let note_commit_r = OrchardFixedBasesFull::NoteCommitR;
        test_single_base(
            chip.clone(),
            layouter.namespace(|| "note_commit_r"),
            FixedPoint::from_inner(chip.clone(), note_commit_r),
            note_commit_r.generator(),
        )?;

        // value_commit_r
        let value_commit_r = OrchardFixedBasesFull::ValueCommitR;
        test_single_base(
            chip.clone(),
            layouter.namespace(|| "value_commit_r"),
            FixedPoint::from_inner(chip.clone(), value_commit_r),
            value_commit_r.generator(),
        )?;

        // spend_auth_g
        let spend_auth_g = OrchardFixedBasesFull::SpendAuthG;
        test_single_base(
            chip.clone(),
            layouter.namespace(|| "spend_auth_g"),
            FixedPoint::from_inner(chip, spend_auth_g),
            spend_auth_g.generator(),
        )?;

        Ok(())
    }

    #[allow(clippy::op_ref)]
    fn test_single_base(
        chip: EccChip,
        mut layouter: impl Layouter<pallas::Base>,
        base: FixedPoint<pallas::Affine, EccChip>,
        base_val: pallas::Affine,
    ) -> Result<(), Error> {
        fn constrain_equal_non_id(
            chip: EccChip,
            mut layouter: impl Layouter<pallas::Base>,
            base_val: pallas::Affine,
            scalar_val: pallas::Scalar,
            result: Point<pallas::Affine, EccChip>,
        ) -> Result<(), Error> {
            let expected = NonIdentityPoint::new(
                chip,
                layouter.namespace(|| "expected point"),
                Some((base_val * scalar_val).to_affine()),
            )?;
            result.constrain_equal(layouter.namespace(|| "constrain result"), &expected)
        }

        // [a]B
        {
            let scalar_fixed = pallas::Scalar::random(OsRng);

            let (result, _) = base.mul(layouter.namespace(|| "random [a]B"), Some(scalar_fixed))?;
            constrain_equal_non_id(
                chip.clone(),
                layouter.namespace(|| "random [a]B"),
                base_val,
                scalar_fixed,
                result,
            )?;
        }

        // There is a single canonical sequence of window values for which a doubling occurs on the last step:
        // 1333333333333333333333333333333333333333333333333333333333333333333333333333333333334 in octal.
        // (There is another *non-canonical* sequence
        // 5333333333333333333333333333333333333333332711161673731021062440252244051273333333333 in octal.)
        {
            let h = pallas::Scalar::from(constants::H as u64);
            let scalar_fixed = "1333333333333333333333333333333333333333333333333333333333333333333333333333333333334"
                        .chars()
                        .fold(pallas::Scalar::zero(), |acc, c| {
                            acc * &h + &pallas::Scalar::from(c.to_digit(8).unwrap() as u64)
                        });
            let (result, _) =
                base.mul(layouter.namespace(|| "mul with double"), Some(scalar_fixed))?;

            constrain_equal_non_id(
                chip.clone(),
                layouter.namespace(|| "mul with double"),
                base_val,
                scalar_fixed,
                result,
            )?;
        }

        // [0]B should return (0,0) since it uses complete addition
        // on the last step.
        {
            let scalar_fixed = pallas::Scalar::zero();
            let (result, _) = base.mul(layouter.namespace(|| "mul by zero"), Some(scalar_fixed))?;
            if let Some(is_identity) = result.inner().is_identity() {
                assert!(is_identity);
            }
        }

        // [-1]B is the largest scalar field element.
        {
            let scalar_fixed = -pallas::Scalar::one();
            let (result, _) = base.mul(layouter.namespace(|| "mul by -1"), Some(scalar_fixed))?;
            constrain_equal_non_id(
                chip,
                layouter.namespace(|| "mul by -1"),
                base_val,
                scalar_fixed,
                result,
            )?;
        }

        Ok(())
    }
}