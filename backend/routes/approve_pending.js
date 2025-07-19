const express = require("express");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize"); // Make sure this checks admin role
const router = express.Router();

router.post("/approve/:username", authorize, async (req, res) => {
  const username = req.params.username;

  try {
    // Only allow admins to approve
    const adminUser = req.user;
    if (adminUser.role !== "ADM") {
      return res.status(403).send("Access denied");
    }

    const result = await pool.query(
      "SELECT * FROM pending_accounts WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("No pending user found");
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
    res.status(500).send("Approval failed: " + err.message);
  }
});

module.exports = router;
