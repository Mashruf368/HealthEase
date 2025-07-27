const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/signin/pharmacist", async (req, res) => {
  const { username, password, name, branch_id } = req.body;

  const type = "pharmacist";
  const role = "admin";

  try {
    const check = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );

    if (check.rows.length > 0) {
      return res.status(400).send("Username already exists");
    }

    const result = await pool.query(
      "INSERT INTO accounts(username, password, role) VALUES ($1, $2, $3) RETURNING user_id",
      [username, password, role]
    );

    const user_id = result.rows[0].user_id;

    await pool.query(
      "INSERT INTO admin(user_id, name, branch_id, type) VALUES ($1, $2, $3, $4)",
      [user_id, name, branch_id, type]
    );

    res.status(201).json({
      message: "Pharmacist registered",
      userId: user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering pharmacist: " + err.message);
  }
});

router.post("/signin/pathologist", async (req, res) => {
  const { username, password, name, branch_id } = req.body;

  const type = "pathologist";
  const role = "admin";

  try {
    const check = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );

    if (check.rows.length > 0) {
      return res.status(400).send("Username already exists");
    }

    const result = await pool.query(
      "INSERT INTO accounts(username, password, role) VALUES ($1, $2, $3) RETURNING user_id",
      [username, password, role]
    );

    const user_id = result.rows[0].user_id;

    await pool.query(
      "INSERT INTO admin(user_id, name, branch_id, type) VALUES ($1, $2, $3, $4)",
      [user_id, name, branch_id, type]
    );

    res.status(201).json({
      message: "Pathologist registered",
      userId: user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering pathologist: " + err.message);
  }
});

module.exports = router;
