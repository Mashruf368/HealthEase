const express = require("express");
const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/doctors/:id/appointment", authorization, async (req, res) => {
  try {
    const userid = req.user;
    const user = await pool.query(
      `SELECT get_patient_id_from_user($1) AS patient_id`,
      [userid]
    );
    patientid = user.rows[0].patient_id;
    const doctorid = req.params.id;

    const { date, schedule, created_at, branch_id, details } = req.body;
    const result = await pool.query(
      `insert into appointment
        (patient_id,doctor_id,scheduled_time,date,status,created_at,branch_id,details)
        values($1,$2,$3,$4,$5,$6,$7,$8) 
        returning *`,
      [patientid, doctorid, schedule, date, "P", created_at, branch_id, details]
    );
    res
      .status(201)
      .json("appointment requested successfully " + result.rows[0]);
  } catch (err) {
    res.status(401).json("error " + err);
  }
});
module.exports = router;
