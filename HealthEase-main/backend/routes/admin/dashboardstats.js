const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const authorizeadmin = require("../../middleware/authorizeadmin");

router.get("/admin/stats",authorization, async (req, res) => {
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

module.exports = router;
