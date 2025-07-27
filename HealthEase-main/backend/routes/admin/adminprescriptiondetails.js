const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get("/admin/prescriptions/:id", authorization, async (req, res) => {
  try {
    const pid = req.params.id;
    console.log("looking for consultation id " + pid);

    const detailsResult = await pool.query(
      `
      SELECT a1.details, d1.name, p1.symptoms, p1.comments
      FROM prescription p1
      JOIN patient p2 ON p1.patient_id = p2.patient_id
      JOIN doctor d1 ON p1.doctor_id = d1.doctor_id
      JOIN appointment a1 ON p1.appointment_id = a1.appointment_id
      WHERE p1.consultation_id = $1
      `,
      [pid]
    );

    const medsResult = await pool.query(
      `
      SELECT p.medicine_id, p.dosage, p.duration, q.name
      FROM prescribed_meds p
      JOIN medicine q ON p.medicine_id = q.medicine_id
      WHERE p.consultation_id = $1
      `,
      [pid]
    );

    const testsResult = await pool.query(
      `
      SELECT a.test_id, a.test_result, a.comments, b.test_name
      FROM recommended_tests a
      JOIN tests b ON a.test_id = b.test_id
      WHERE a.consultation_id = $1
      `,
      [pid]
    );

    return res.status(200).json({
      prescription: detailsResult.rows[0] || {},
      medicines: medsResult.rows,
      tests: testsResult.rows,
    });
  } catch (err) {
    console.error("Error in /admin/prescriptions/:id:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.get("/pharmacist/prescriptions/:id", authorization, async (req, res) => {
  try {
    const pid = req.params.id;
    console.log("looking for consultaion id " + pid);
    const detailsResult = await pool.query(
      `
        select a1.details,d1.name,p1.symptoms,p1.comments,p2.name as patient_name,p2.patient_id
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
      SELECT a.medicine_id, a.dosage, a.duration,b.name
      FROM prescribed_meds a,medicine b
      where a.medicine_id = b.medicine_id  
      and a.consultation_id = $1
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

// router.get(
//   "/pathologist/prescriptions/:id",
//   authorization,
//   async (req, res) => {
//     try {
//       const pid = req.params.id;
//       console.log("looking for consultaion id " + pid);
//       const detailsResult = await pool.query(
//         `
//         select a1.details,d1.name,p1.symptoms,p1.comments,p2.name as patient_name,p2.patient_id
//         from prescription p1,patient p2,doctor d1,appointment a1
//         where p1.patient_id = p2.patient_id
//         and p1.doctor_id = d1.doctor_id
//         and p1.appointment_id = a1.appointment_id
//         and p1.consultation_id = $1
//         `,
//         [pid]
//       );

//       const medsResult = await pool.query(
//         `
//       SELECT a.medicine_id, a.dosage, a.duration,b.name
//       FROM prescribed_meds a,medicine b
//       where a.medicine_id = b.medicine_id
//       and a.consultation_id = $1
//       `,
//         [pid]
//       );

//       const testsResult = await pool.query(
//         `
//       SELECT a.test_id, a.test_result,a.comments,b.test_name
//       FROM recommended_tests a,tests b
//       WHERE a.test_id = b.test_id
//       and a.consultation_id = $1
//       `,
//         [pid]
//       );

//       // Combine and return all data
//       return res.status(200).json({
//         prescription: detailsResult.rows[0] || {},
//         medicines: medsResult.rows,
//         tests: testsResult.rows,
//       });
//     } catch (err) {
//       res.status(401).json("error" + err);
//     }
//   }
// );
router.get(
  "/pathologist/prescriptions/:id",
  authorization,
  async (req, res) => {
    try {
      const pid = req.params.id;
      console.log("looking for consultation id " + pid);

      const detailsResult = await pool.query(
        `
        SELECT a1.details, d1.name, p1.symptoms, p1.comments, p2.name AS patient_name, p2.patient_id
        FROM prescription p1
        JOIN patient p2 ON p1.patient_id = p2.patient_id
        JOIN doctor d1 ON p1.doctor_id = d1.doctor_id
        JOIN appointment a1 ON p1.appointment_id = a1.appointment_id
        WHERE p1.consultation_id = $1
        `,
        [pid]
      );

      const medsResult = await pool.query(
        `
        SELECT a.medicine_id, a.dosage, a.duration, b.name
        FROM prescribed_meds a
        JOIN medicine b ON a.medicine_id = b.medicine_id
        WHERE a.consultation_id = $1
        `,
        [pid]
      );

      const testsResult = await pool.query(
        `
        SELECT rt.*, t.test_name
        FROM recommended_tests rt
        JOIN tests t ON rt.test_id = t.test_id
        WHERE rt.consultation_id = $1
        ORDER BY rt.updated_at DESC NULLS LAST
        `,
        [pid]
      );

      return res.status(200).json({
        prescription: detailsResult.rows[0] || {},
        medicines: medsResult.rows,
        tests: testsResult.rows,
      });
    } catch (err) {
      console.error("Error in /pathologist/prescriptions/:id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
