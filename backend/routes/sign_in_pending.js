const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

const registerPending = async (req, res, type) => {
  const { username, password, name, branch_id } = req.body;

  try {
    const check = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );
    if (check.rows.length > 0) {
      return res.status(400).send("Username already exists");
    }

    const checkPending = await pool.query(
      "SELECT * FROM pending_accounts WHERE username = $1",
      [username]
    );
    if (checkPending.rows.length > 0) {
      return res.status(400).send("Pending request already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      `INSERT INTO pending_accounts (username, password, name, branch_id, type)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, hashedPassword, name, branch_id, type]
    );

    res.status(201).json({ message: `${type} pending approval` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error: " + err.message);
  }
};

router.post("/signin/pharmacist", (req, res) =>
  registerPending(req, res, "pharmacist")
);
router.post("/signin/pathologist", (req, res) =>
  registerPending(req, res, "pathologist")
);

module.exports = router;
