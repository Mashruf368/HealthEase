// const express = require("express");
// const pool = require("../../db");
// //const authorization = require("../../middleware/authorization");
// const authorizedoctor = require("../../middleware/authorizedoctor");
// const router = express.Router();

// router.get("/medicine", async (req, res) => {
//   try {
//     const meds = await pool.query(
//       `select medicine_id,name,manufacturer
//         from medicine
//         order by name
//         `
//     );
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({ error: "Server error" + err });
//   }
// });

// router.get("/test", async (req, res) => {
//   try {
//     const meds = await pool.query(
//       `select test_id,test_name
//         from tests
//         order by test_name
//         `
//     );
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({ error: "Server error" + err });
//   }
// });
// module.exports = router;

// // const express = require("express");
// // const pool = require("../../db");
// // //const authorization = require("../../middleware/authorization");
// // const authorizedoctor = require("../../middleware/authorizedoctor");
// // const router = express.Router();

// // router.get("/medicine", async (req, res) => {
// //   try {
// //     const meds = await pool.query(
// //       `select medicine_id, name, manufacturer
// //         from medicine
// //         order by name`
// //     );
// //     res.json(meds.rows);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: "Server error: " + err });
// //   }
// // });

// // router.get("/test", async (req, res) => {
// //   try {
// //     const tests = await pool.query(
// //       `select test_id, test_name
// //         from tests
// //         order by test_name`
// //     );
// //     res.json(tests.rows);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: "Server error: " + err });
// //   }
// // });
const express = require("express");
const pool = require("../../db");
// const authorization = require("../../middleware/authorization");
const authorizedoctor = require("../../middleware/authorizedoctor");
const router = express.Router();

router.get("/medicine", async (req, res) => {
  try {
    const meds = await pool.query(
      `SELECT medicine_id, name, manufacturer FROM medicine ORDER BY name`
    );
    res.json(meds.rows); // ✅ Send result to frontend
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    const tests = await pool.query(
      `SELECT test_id, test_name FROM tests ORDER BY test_name`
    );
    res.json(tests.rows); // ✅ Send result to frontend
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
