window.BENCHMARK_DATA = {
  "lastUpdate": 1657309862816,
  "repoUrl": "https://github.com/AtHeartEngineer/halo2",
  "entries": {
    "halo2 Benchmark": [
      {
        "commit": {
          "author": {
            "email": "1675654+AtHeartEngineer@users.noreply.github.com",
            "name": "AtHeartEngineer",
            "username": "AtHeartEngineer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7204d7f439e2ac0ec10bfed25c753ee6af00cf40",
          "message": "Merge branch 'zcash:main' into main",
          "timestamp": "2022-07-08T14:46:30-04:00",
          "tree_id": "fb52d84965affcc89beb89058c58753b8b03f1dc",
          "url": "https://github.com/AtHeartEngineer/halo2/commit/7204d7f439e2ac0ec10bfed25c753ee6af00cf40"
        },
        "date": 1657309857657,
        "tool": "cargo",
        "benches": [
          {
            "name": "WIDTH = 3, RATE = 2-prover",
            "value": 78683258,
            "range": "± 3475127",
            "unit": "ns/iter"
          },
          {
            "name": "WIDTH = 3, RATE = 2-verifier",
            "value": 3394141,
            "range": "± 37039",
            "unit": "ns/iter"
          },
          {
            "name": "WIDTH = 9, RATE = 8-prover",
            "value": 178777021,
            "range": "± 1702375",
            "unit": "ns/iter"
          },
          {
            "name": "WIDTH = 9, RATE = 8-verifier",
            "value": 4149898,
            "range": "± 92491",
            "unit": "ns/iter"
          },
          {
            "name": "WIDTH = 12, RATE = 11-prover",
            "value": 248379283,
            "range": "± 1969553",
            "unit": "ns/iter"
          },
          {
            "name": "WIDTH = 12, RATE = 11-verifier",
            "value": 4509634,
            "range": "± 71569",
            "unit": "ns/iter"
          },
          {
            "name": "Poseidon/2-to-1",
            "value": 46838,
            "range": "± 468",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash-to-point/510",
            "value": 162822,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash/510",
            "value": 177999,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/commit/510",
            "value": 286628,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/short-commit/510",
            "value": 286689,
            "range": "± 159",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash-to-point/520",
            "value": 166257,
            "range": "± 170",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash/520",
            "value": 181405,
            "range": "± 46",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/commit/520",
            "value": 289997,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/short-commit/520",
            "value": 290034,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash-to-point/1086",
            "value": 347789,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/hash/1086",
            "value": 362727,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/commit/1086",
            "value": 471255,
            "range": "± 5244",
            "unit": "ns/iter"
          },
          {
            "name": "Sinsemilla/short-commit/1086",
            "value": 471511,
            "range": "± 6765",
            "unit": "ns/iter"
          },
          {
            "name": "double-and-add",
            "value": 3715917,
            "range": "± 4968",
            "unit": "ns/iter"
          },
          {
            "name": "dev-lookup/14",
            "value": 6073441,
            "range": "± 3100",
            "unit": "ns/iter"
          },
          {
            "name": "dev-lookup/15",
            "value": 10381604,
            "range": "± 13924",
            "unit": "ns/iter"
          },
          {
            "name": "dev-lookup/16",
            "value": 22268596,
            "range": "± 64742",
            "unit": "ns/iter"
          },
          {
            "name": "dev-lookup/17",
            "value": 41563787,
            "range": "± 333899",
            "unit": "ns/iter"
          },
          {
            "name": "dev-lookup/18",
            "value": 81414664,
            "range": "± 269400",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/3",
            "value": 7163,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/4",
            "value": 8243,
            "range": "± 698",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/5",
            "value": 16248,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/6",
            "value": 20103,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/7",
            "value": 28347,
            "range": "± 190",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/8",
            "value": 49022,
            "range": "± 989",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/9",
            "value": 101379,
            "range": "± 8466",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/10",
            "value": 197208,
            "range": "± 9034",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/11",
            "value": 403981,
            "range": "± 10924",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/12",
            "value": 846017,
            "range": "± 12315",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/13",
            "value": 1782897,
            "range": "± 12076",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/14",
            "value": 3783648,
            "range": "± 40523",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/15",
            "value": 8076467,
            "range": "± 176881",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/16",
            "value": 17399507,
            "range": "± 138868",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/17",
            "value": 37165856,
            "range": "± 227757",
            "unit": "ns/iter"
          },
          {
            "name": "fft/k/18",
            "value": 79521723,
            "range": "± 393287",
            "unit": "ns/iter"
          },
          {
            "name": "hash-to-curve/Pallas",
            "value": 34924,
            "range": "± 15",
            "unit": "ns/iter"
          },
          {
            "name": "hash-to-curve/Vesta",
            "value": 34985,
            "range": "± 26",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/8",
            "value": 176743833,
            "range": "± 11247916",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/9",
            "value": 380180073,
            "range": "± 1153613",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/10",
            "value": 819755691,
            "range": "± 6184455",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/11",
            "value": 1770091992,
            "range": "± 51323319",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/12",
            "value": 3782768728,
            "range": "± 9801038",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/13",
            "value": 8082622976,
            "range": "± 31157669",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/14",
            "value": 17235104560,
            "range": "± 23003218",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/15",
            "value": 36559564984,
            "range": "± 44210266",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-keygen/16",
            "value": 77341867168,
            "range": "± 183783794",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/8",
            "value": 108940269,
            "range": "± 1163943",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/9",
            "value": 188359420,
            "range": "± 1540977",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/10",
            "value": 334201030,
            "range": "± 1784712",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/11",
            "value": 609526647,
            "range": "± 5093473",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/12",
            "value": 1135700077,
            "range": "± 9749615",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/13",
            "value": 2142294760,
            "range": "± 4948746",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/14",
            "value": 4060371584,
            "range": "± 9426791",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/15",
            "value": 7860922915,
            "range": "± 11487498",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-prover/16",
            "value": 15108244633,
            "range": "± 15835829",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/8",
            "value": 5917291,
            "range": "± 90617",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/9",
            "value": 9171592,
            "range": "± 156366",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/10",
            "value": 14693711,
            "range": "± 202076",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/11",
            "value": 24857191,
            "range": "± 361655",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/12",
            "value": 42618660,
            "range": "± 507764",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/13",
            "value": 75493022,
            "range": "± 348092",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/14",
            "value": 137086175,
            "range": "± 1230783",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/15",
            "value": 252094103,
            "range": "± 3693500",
            "unit": "ns/iter"
          },
          {
            "name": "plonk-verifier/16",
            "value": 455227605,
            "range": "± 3638065",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}