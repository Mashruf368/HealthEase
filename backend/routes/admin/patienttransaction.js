const express = require("express");
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const router = express.Router();

// router.get("/pharmacist/patient/:id", authorization, async (req, res) => {
//   try {
//     const patient_id = req.params.id;
//     console.log("in backend of patient transactions");
//     const result = await pool.query(
//       `select m.name,t.amount,t.state,t.created_at,t.cost
//       from transaction t,medicine m
//       where t.item_id = m.medicine_id
//       and patient_id = $1
//       and item_type = $2
//       and t.state = 'P'`,
//       [patient_id, "medicine"]
//     );

//     const result2 = await pool.query(
//       `select m.name,t.amount,t.state,t.created_at,t.cost
//       from transaction t,medicine m
//       where t.item_id = m.medicine_id
//       and patient_id = $1
//       and item_type = $2
//       and t.state = 'C'`,
//       [patient_id, "medicine"]
//     );
//     //console.log(result.rows);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json("Server error: " + err.message);
//   }
// });
router.get("/pharmacist/patient/:id", authorization, async (req, res) => {
  try {
    const patient_id = req.params.id;

    const pending = await pool.query(
      `SELECT m.name, t.amount, t.state, t.created_at, t.cost, t.transaction_id
       FROM transaction t
       JOIN medicine m ON t.item_id = m.medicine_id
       WHERE t.patient_id = $1 AND t.item_type = $2 AND t.state = 'P'`,
      [patient_id, "medicine"]
    );

    const completed = await pool.query(
      `SELECT m.name, t.amount, t.state, t.created_at, t.cost
       FROM transaction t
       JOIN medicine m ON t.item_id = m.medicine_id
       WHERE t.patient_id = $1 AND t.item_type = $2 AND t.state = 'A'`,
      [patient_id, "medicine"]
    );

    res.status(200).json({
      pending: pending.rows,
      completed: completed.rows,
    });
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

module.exports = router;
