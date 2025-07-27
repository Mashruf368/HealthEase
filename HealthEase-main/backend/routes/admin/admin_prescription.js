const express = require("express");
const pool = require("../../db");
//const authorization = require("../middleware/authorizeadmin");
const authorizeadmin = require("../../middleware/authorizeadmin");
const router = express.Router();

// router.get("/admin/prescriptions", authorizeadmin, async (req, res) => {
//   try {
//     console.log("in backend of prescriptions");
//     const result = await pool.query(
//       `select pp.name as patient_name,dd.name as doctor_name,a.appointment_id,p.consultation_id
//         from prescription p,appointment a,patient pp,doctor dd
//         where p.appointment_id = a.appointment_id
//         and pp.patient_id = p.patient_id
//         and dd.doctor_id = p.doctor_id`
//     );
//     //console.log(result.rows);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json("Server error: " + err.message);
//   }
// });

router.get("/admin/prescriptions", authorizeadmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const prescriptionsQuery = `
      SELECT pp.name AS patient_name, dd.name AS doctor_name, a.appointment_id, p.consultation_id
      FROM prescription p
      JOIN appointment a ON p.appointment_id = a.appointment_id
      JOIN patient pp ON pp.patient_id = p.patient_id
      JOIN doctor dd ON dd.doctor_id = p.doctor_id
      ORDER BY p.consultation_id DESC
      LIMIT $1 OFFSET $2
    `;

    const totalCountQuery = `
      SELECT COUNT(*) FROM prescription
    `;

    const [prescriptionsResult, countResult] = await Promise.all([
      pool.query(prescriptionsQuery, [limit, offset]),
      pool.query(totalCountQuery),
    ]);

    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      prescriptions: prescriptionsResult.rows,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
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
