const express = require("express");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
//const authorize = require("../middleware/authorize"); // Make sure this checks admin role
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/admin/approve/:username", authorization, async (req, res) => {
  const username = req.params.username;

  try {
    // Only allow admins to approve

    console.log("in backend of aprove pending");
    const result = await pool.query(
      "SELECT * FROM pending_accounts WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No pending user found" });
    }

    const pending = result.rows[0];

    // Insert into accounts
    const accountRes = await pool.query(
      `INSERT INTO accounts (username, password, role)
       VALUES ($1, $2, 'ADM') RETURNING user_id`,
      [pending.username, pending.password]
    );

    const user_id = accountRes.rows[0].user_id;

    // Insert into admin
    await pool.query(
      `INSERT INTO admin (user_id, name, branch_id, type)
       VALUES ($1, $2, $3, $4)`,
      [user_id, pending.name, pending.branch_id, pending.type]
    );

    // Delete from pending
    await pool.query("DELETE FROM pending_accounts WHERE username = $1", [
      username,
    ]);

    const token = jwtGenerator(user_id);
    return res.status(201).json({ message: "Account approved", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
});

router.post("/admin/approvedoc/:id", authorization, async (req, res) => {
  const pendingId = req.params.id;

  try {
    // 1. Fetch the pending doctor
    const pendingDoctorRes = await pool.query(
      `SELECT * FROM pending_doctor WHERE pending_id = $1`,
      [pendingId]
    );

    if (pendingDoctorRes.rows.length === 0) {
      return res.status(404).json({ message: "Pending doctor not found" });
    }

    const pending = pendingDoctorRes.rows[0];

    // 2. Insert into accounts table and get user_id
    const accountRes = await pool.query(
      `INSERT INTO accounts (username, password, role)
       VALUES ($1, $2, 'DOC')
       RETURNING user_id`,
      [pending.username, pending.password]
    );

    const user_id = accountRes.rows[0].user_id;

    // 3. Insert into doctor table
    const doctorRes = await pool.query(
      `INSERT INTO doctor (name, age, gender, contacts, speciality, details, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING doctor_id`,
      [
        pending.name,
        pending.age,
        pending.gender,
        pending.contacts,
        pending.speciality,
        pending.details,
        user_id,
      ]
    );

    const doctor_id = doctorRes.rows[0].doctor_id;

    // 4. Fetch and insert associated degrees
    const degreesRes = await pool.query(
      `SELECT * FROM pending_degree WHERE pending_id = $1`,
      [pendingId]
    );

    for (const degree of degreesRes.rows) {
      await pool.query(
        `INSERT INTO doctor_degree (degree_id, doctor_id, institute, year_of_passing)
         VALUES ($1, $2, $3, $4)`,
        [degree.degree_id, doctor_id, degree.institute, degree.year_of_passing]
      );
    }

    // 5. Delete from pending tables
    await pool.query(`DELETE FROM pending_degree WHERE pending_id = $1`, [
      pendingId,
    ]);
    await pool.query(`DELETE FROM pending_doctor WHERE pending_id = $1`, [
      pendingId,
    ]);

    return res.status(201).json({ message: "Doctor approved successfully" });
  } catch (err) {
    console.error("Error approving doctor:", err);
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
});

module.exports = router;
