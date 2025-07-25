const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get("/profile/prescriptions/:id", authorization, async (req, res) => {
  try {
    const userid = req.user;
    const pid = req.params.id;
    console.log("in prescription view");
    const detailsResult = await pool.query(
      `
        select a1.details,d1.name as doctor_name,p1.symptoms,p1.comments
        from prescription p1,patient p2,doctor d1,appointment a1
        where p1.patient_id = p2.patient_id
        and p1.doctor_id = d1.doctor_id
        and p1.appointment_id = a1.appointment_id
        and p1.consultation_id = $1
        `,
      [pid]
    );

    const medsResult = await pool.query(
      `
      SELECT medicine_id, dosage, duration
      FROM prescribed_meds
      WHERE consultation_id = $1
      `,
      [pid]
    );

    const testsResult = await pool.query(
      `
      SELECT test_id, test_result,comments
      FROM recommended_tests
      WHERE consultation_id = $1
      `,
      [pid]
    );

    // Combine and return all data
    return res.status(200).json({
      prescription: detailsResult.rows[0] || {},
      medicines: medsResult.rows,
      tests: testsResult.rows,
    });
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

module.exports = router;
