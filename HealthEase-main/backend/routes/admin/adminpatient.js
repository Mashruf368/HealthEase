const express = require("express");
const pool = require("../../db");
const authorizeadmin = require("../../middleware/authorizeadmin");
const router = express.Router();

router.get("/admin/patient/:id", authorizeadmin, async (req, res) => {
  try {
    const patientid = req.params.id;

    const patientResult = await pool.query(
      `SELECT name, address, gender, age, contact_no 
       FROM patient 
       WHERE patient_id = $1`,
      [patientid]
    );

    const prescriptionResult = await pool.query(
      `SELECT d.name, consultation_id, date 
       FROM prescription p,doctor d
       WHERE p.doctor_id = d.doctor_id 
       and patient_id = $1
       ORDER BY date DESC`,
      [patientid]
    );

    res.status(200).json({
      patient: patientResult.rows[0],
      prescriptions: prescriptionResult.rows,
    });
  } catch (err) {
    console.error("Error fetching patient details:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;

/**

const result2 = await pool.query(
      `select p.consultation_id,mm.name,m.dosage,m.duration
        from prescription p,prescribed_meds m,medicine mm
        where p.consultation_id = m.consultation_id
        and m.medicine_id = mm.medicine_id
        and p.patient_id = $1
        `,
      [patientid]
    );

    const result3 = await pool.query(
      `
        select p.consultation_id,tt.test_name,t.test_result,tt.normal_results,t.payment_state,t.updated_at
        from prescription p,recommended_tests t,tests tt
        where p.consultation_id = t.consultation_id
        and t.test_id = tt.test_id
        and patient_id = $1
        `,
      [patientid]
    );



 */
