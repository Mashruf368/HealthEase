const express = require("express");
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const router = express.Router();

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

module.exports = router;
