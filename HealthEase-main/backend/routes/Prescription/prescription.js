const express = require("express");
const pool = require("../../db");
//const authorization = require("../../middleware/authorization");
const authorizedoctor = require("../../middleware/authorizedoctor");
const router = express.Router();

router.get("/doctor/appointments", authorizedoctor, async (req, res) => {
  try {
    const userid = req.user;

    const user = await pool.query(
      `select * from doctor
        where user_id = $1`,
      [userid]
    );
    const doctorid = user.rows[0].doctor_id;

    const result = await pool.query(
      `select a.*, p.name as patient_name
        from appointment a
        join patient p
        on a.patient_id = p.patient_id
        where a.doctor_id = $1 and a.status = 'A'
        order by date asc,a.scheduled_time asc`,

      [doctorid]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(401).json("error " + err);
  }
});
module.exports = router;
