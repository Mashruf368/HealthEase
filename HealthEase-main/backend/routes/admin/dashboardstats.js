const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const authorizeadmin = require("../../middleware/authorizeadmin");

router.get("/admin/stats", authorization, async (req, res) => {
  try {
    console.log("in backend of stats");
    const result = await pool.query(
      `SELECT COUNT(*) AS c
       FROM appointment
       WHERE DATE(date) = CURRENT_DATE`
    );

    const result2 = await pool.query(
      `SELECT COUNT(*) AS cr
       FROM appointment`
    );

    const today = result.rows[0].c;
    const total = result2.rows[0].cr;

    res.status(200).json({
      todayAppointments: today,
      totalAppointments: total,
    });
  } catch (err) {
    console.error("Appointment stats error:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.get("/dash/stats", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const patRes = await pool.query(
      `SELECT patient_id FROM patient WHERE user_id = $1`,
      [userid]
    );

    if (patRes.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientId = patRes.rows[0].patient_id;

    const totalRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE patient_id = $1`,
      [patientId]
    );
    const doneRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE patient_id = $1 AND status = $2`,
      [patientId, "C"]
    );
    const pendingRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE patient_id = $1 AND status = $2`,
      [patientId, "A"]
    );

    res.status(200).json({
      totalAppointments: totalRes.rows[0].count,
      completedAppointments: doneRes.rows[0].count,
      upcomingAppointments: pendingRes.rows[0].count,
    });
  } catch (err) {
    console.error("Appointment stats error:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.get("/dash/doc/stats", authorization, async (req, res) => {
  try {
    const userid = req.user;

    // Get doctor_id using the logged-in user_id
    const docid = await pool.query(
      `SELECT doctor_id FROM doctor WHERE user_id = $1`,
      [userid]
    );

    if (docid.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const doctorid = docid.rows[0].doctor_id;

    // Total appointments
    const totalRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE doctor_id = $1`,
      [doctorid]
    );

    // Completed appointments (status = 'C')
    const doneRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE doctor_id = $1 AND status = $2`,
      [doctorid, "C"]
    );

    // Today's pending appointments (status = 'P' and date = today)
    const pendingRes = await pool.query(
      `SELECT COUNT(*) FROM appointment WHERE doctor_id = $1 AND status = $2 AND date = CURRENT_DATE`,
      [doctorid, "P"]
    );

    res.status(200).json({
      totalAppointments: totalRes.rows[0].count,
      completedAppointments: doneRes.rows[0].count,
      pendingAppointments: pendingRes.rows[0].count,
    });
  } catch (err) {
    console.error("Appointment stats error:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
