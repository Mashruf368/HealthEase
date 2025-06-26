const express = require("express");
const pool = require("../db");
//const authorization = require("../middleware/authorizeadmin");
const authorizeadmin = require("../middleware/authorizeadmin");
const router = express.Router();

router.get("/admin/appointments", authorizeadmin, async (req, res) => {
  try {
    const admin_userid = req.user;
    const brnch = await pool.query(
      `select branch_id from admin where user_id = $1`,
      [admin_userid]
    );
    const branch_id = brnch.rows[0].branch_id;

    const result = await pool.query(
      `SELECT a.appointment_id, a.date, a.scheduled_time, a.status, a.details,
                p.name AS patient_name,d.doctor_id, d.name AS doctor_name, b.name AS branch_name
         FROM appointment a
         JOIN patient p ON a.patient_id = p.patient_id
         JOIN doctor d ON a.doctor_id = d.doctor_id
         JOIN branch b ON a.branch_id = b.branch_id
         WHERE a.branch_id = $1 and a.status = 'P'
         ORDER BY a.created_at DESC`,
      [branch_id]
      //`select * from appointment`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

router.patch(
  "/admin/appointments/:id/approve",
  authorizeadmin,
  async (req, res) => {
    try {
      const { scheduled_time } = req.body;
      const appointment_id = req.params.id;

      const result = await pool.query(
        `UPDATE appointment SET status = 'A', 
       scheduled_time = COALESCE($1, scheduled_time) 
       WHERE appointment_id = $2 RETURNING *`,
        [scheduled_time, appointment_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json("Appointment not found");
      }

      res.status(200).json("Appointment approved");
    } catch (err) {
      res.status(401).json("Server error: " + err.message);
    }
  }
);

router.get("/doctor/:id/schedule", authorizeadmin, async (req, res) => {
  try {
    const doctorId = req.params.id;

    const schedule = await pool.query(
      `SELECT a.appointment_id, a.date, a.scheduled_time, a.status,
              p.name AS patient_name
       FROM appointment a
       JOIN patient p ON a.patient_id = p.patient_id
       WHERE a.doctor_id = $1 
       ORDER BY a.date, a.scheduled_time`,
      [doctorId]
    );

    res.status(200).json(schedule.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});

module.exports = router;
