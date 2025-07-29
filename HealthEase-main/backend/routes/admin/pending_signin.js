const express = require("express");
const pool = require("../../db");
const authorizeadmin = require("../../middleware/authorizeadmin");
const router = express.Router();

router.get("/admin/pending/doc", authorizeadmin, async (req, res) => {
  try {
    console.log("in backend of pending registrations");

    // Get pending doctor registrations with their degrees
    const result = await pool.query(`
      SELECT 
        d.pending_id,
        d.name,
        d.age,
        d.gender,
        d.contacts,
        d.speciality,
        d.details,
        json_agg(
          json_build_object(
            'degree_id', deg.degree_id,
            'institution', deg.institute,
            'year', deg.year_of_passing
          )
        ) FILTER (WHERE deg.degree_id IS NOT NULL) AS degrees
      FROM pending_doctor d
      LEFT JOIN pending_degree deg ON d.pending_id = deg.pending_id
      GROUP BY d.pending_id, d.name, d.age, d.gender, d.contacts, d.speciality, d.details
      ORDER BY d.name;
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching pending registrations:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.get("/admin/pending/adm", authorizeadmin, async (req, res) => {
  try {
    console.log("in backend of pending registrations");
    const result = await pool.query(`
        select * from pending_accounts`);
    //console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json("Server error: " + err.message);
  }
});

module.exports = router;
