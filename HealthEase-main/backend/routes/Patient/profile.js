// const router = require("express").Router();
// const pool = require("../../db");
// const authorization = require("../../middleware/authorization");

// router.get(
//   "/profile/transactions/medicine",
//   authorization,
//   async (req, res) => {
//     try {
//       const userid = req.user;

//       const pid = await pool.query(
//         `select patient_id
//         from patient
//         where user_id = $1`,
//         [userid]
//       );

//       const result = await pool.query(
//         `select *
//         from transaction
//         where patient_id = $1
//         and item_type = $2`,
//         [pid, "medicine"]
//       );
//     } catch (err) {
//       res.status(401).json("error" + err);
//     }
//   }
// );

// router.get("/profile/transactions/test", authorization, async (req, res) => {
//   try {
//     const userid = req.user;

//     const pid = await pool.query(
//       `select patient_id
//         from patient
//         where user_id = $1`,
//       [userid]
//     );

//     const result = await pool.query(
//       `select *
//         from transaction
//         where patient_id = $1
//         and item_type = $2`,
//       [pid, "test"]
//     );
//   } catch (err) {
//     res.status(401).json("error" + err);
//   }
// });

// module.exports = router;
const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get(
  "/profile/transactions/medicine",
  authorization,
  async (req, res) => {
    try {
      const userid = req.user;

      const pidResult = await pool.query(
        `SELECT patient_id FROM patient WHERE user_id = $1`,
        [userid]
      );

      if (pidResult.rowCount === 0) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const patientId = pidResult.rows[0].patient_id;

      const result = await pool.query(
        `SELECT * FROM transaction WHERE patient_id = $1 AND item_type = $2`,
        [patientId, "medicine"]
      );

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/profile/transactions/test", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const pidResult = await pool.query(
      `SELECT patient_id FROM patient WHERE user_id = $1`,
      [userid]
    );

    if (pidResult.rowCount === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientId = pidResult.rows[0].patient_id;

    const result = await pool.query(
      `SELECT * FROM transaction WHERE patient_id = $1 AND item_type = $2`,
      [patientId, "test"]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
