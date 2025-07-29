const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get("/profile/prescriptions", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const stuff = await pool.query(`select * from patient where user_id = $1`, [
      userid,
    ]);
    const patid = stuff.rows[0].patient_id;
    console.log(patid);
    const result = await pool.query(
      `select d.name as doctor_name,p.appointment_id,p.consultation_id 
      from prescription p,doctor d
      where p.doctor_id = d.doctor_id
      and patient_id = $1`,
      [patid]
    );
    console.log("sent prescs successfully");
    return res.status(200).json(result.rows);
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

router.get("/profile/prescriptions/:id", authorization, async (req, res) => {
  try {
    const appid = req.params.id;
    const appointmentResult = await pool.query(
      `SELECT patient_id FROM appointment WHERE appointment_id = $1`,
      [appid]
    );

    if (appointmentResult.rows.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const userid = appointmentResult.rows[0].patient_id;
    console.log(userid);
    const result = await pool.query(
      "select * from prescription where patient_id = $1",
      [userid]
    );
    console.log("sent prescs successfully");
    return res.status(200).json(result.rows);
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

module.exports = router;
