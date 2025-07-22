const express = require("express");
const pool = require("../../db");
//const authorization = require("../middleware/authorizeadmin");
const authorizeadmin = require("../../middleware/authorizeadmin");
const router = express.Router();

router.get("/admin/prescriptions", authorizeadmin, async (req, res) => {
  try {
    console.log("in backend of prescriptions");
    const result = await pool.query(
      `select pp.name as patient_name,dd.name as doctor_name,a.appointment_id,p.consultation_id
        from prescription p,appointment a,patient pp,doctor dd
        where p.appointment_id = a.appointment_id
        and pp.patient_id = p.patient_id
        and dd.doctor_id = p.doctor_id`
    );
    //console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

router.get("/pharmacist/prescriptions", authorizeadmin, async (req, res) => {
  try {
    console.log("in backend of prescriptions");
    const result = await pool.query(
      `select pp.name as patient_name,pp.patient_id as patient_id,dd.name as doctor_name,a.appointment_id,p.consultation_id
        from prescription p,appointment a,patient pp,doctor dd
        where p.appointment_id = a.appointment_id
        and pp.patient_id = p.patient_id
        and dd.doctor_id = p.doctor_id`
    );
    //console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

router.get("/pathologist/prescriptions", authorizeadmin, async (req, res) => {
  try {
    console.log("in backend of prescriptions");
    const result = await pool.query(
      `select pp.name as patient_name,pp.patient_id as patient_id,dd.name as doctor_name,a.appointment_id,p.consultation_id
        from prescription p,appointment a,patient pp,doctor dd
        where p.appointment_id = a.appointment_id
        and pp.patient_id = p.patient_id
        and dd.doctor_id = p.doctor_id`
    );
    //console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

module.exports = router;
