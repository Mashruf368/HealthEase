const express = require("express");
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const router = express.Router();
//get all doctor info in find doctor page
router.post("/doctors", authorization, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        d.doctor_id,
        d.name,
        d.age,
        d.gender,
        d.contacts,
        d.details,
        d.speciality,
        json_agg(json_build_object(
          'degree_name', deg.name,
          'institute', dd.institute,
          'year', dd.year_of_passing
        )) AS degrees
      FROM doctor d
      LEFT JOIN doctor_degree dd ON d.doctor_id = dd.doctor_id
      LEFT JOIN degree deg ON dd.degree_id = deg.degree_id
      GROUP BY d.doctor_id, d.name, d.age, d.gender, d.contacts, d.details, d.speciality
      ORDER BY d.name
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Server error while fetching doctors" });
  }
});
//get this doctor info in make appointment page
// router.get("/doctors/:id", authorization, async (req, res) => {
//   const doctorId = req.params.id;

//   try {
//     const doctorResult = await pool.query(
//       `
//       SELECT
//         d.doctor_id,
//         d.name,
//         d.age,
//         d.gender,
//         d.contacts,
//         d.details,
//         d.speciality,
//         json_agg(json_build_object(
//           'degree_name', deg.name,
//           'institute', dd.institute,
//           'year', dd.year_of_passing
//         ) ORDER BY dd.year_of_passing DESC) AS degrees
//       FROM doctor d
//       LEFT JOIN doctor_degree dd ON d.doctor_id = dd.doctor_id
//       LEFT JOIN degree deg ON dd.degree_id = deg.degree_id
//       WHERE d.doctor_id = $1
//       GROUP BY d.doctor_id
//     `,
//       [doctorId]
//     );

//     const scheduleResult = await pool.query(
//       `
//       SELECT
//         branch_id,
//         shift_no,
//         day_of_week
//       FROM doctor_schedule
//       WHERE doctor_id = $1
//       ORDER BY day_of_week
//     `,
//       [doctorId]
//     );

//     res.status(200).json({
//       doctor: doctorResult.rows[0],
//       schedule: scheduleResult.rows,
//     });
//   } catch (err) {
//     console.error("Error fetching doctor info:", err);
//     res.status(500).json({ error: "Server error while fetching doctor info" });
//   }
// });
router.get("/doctors/:id", authorization, async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctorResult = await pool.query(
      `
      SELECT 
        d.doctor_id,
        d.name,
        d.age,
        d.gender,
        d.contacts,
        d.details,
        d.speciality,
        json_agg(json_build_object(
          'degree_name', deg.name,
          'institute', dd.institute,
          'year', dd.year_of_passing
        ) ORDER BY dd.year_of_passing DESC) AS degrees
      FROM doctor d
      LEFT JOIN doctor_degree dd ON d.doctor_id = dd.doctor_id
      LEFT JOIN degree deg ON dd.degree_id = deg.degree_id
      WHERE d.doctor_id = $1
      GROUP BY d.doctor_id
      `,
      [doctorId]
    );

    const scheduleResult = await pool.query(
      `
  SELECT 
    ds.branch_id,
    b.name,
    b.address AS branch_address,
    b.contact_info AS branch_contact,
    ds.shift_no,
    s.start_time,
    s.end_time,
    ds.day_of_week
  FROM doctor_schedule ds
  JOIN shift s ON ds.shift_no = s.shift_no
  JOIN branch b ON ds.branch_id = b.branch_id
  WHERE ds.doctor_id = $1
  ORDER BY ds.day_of_week
  `,
      [doctorId]
    );

    res.status(200).json({
      doctor: doctorResult.rows[0],
      schedule: scheduleResult.rows,
    });
  } catch (err) {
    console.error("Error fetching doctor info:", err);
    res.status(500).json({ error: "Server error while fetching doctor info" });
  }
});

module.exports = router;
