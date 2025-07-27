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

router.post("/signin/doctor", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      age,
      gender,
      contacts,
      speciality,
      details,
      degrees, // array
    } = req.body;
    const genderenum =
      gender === "Male" ? "M" : gender === "Female" ? "F" : gender;
    // Check username in both pending and approved doctor
    const check1 = await pool.query(
      "SELECT * FROM pending_doctor WHERE username = $1",
      [username]
    );
    const check2 = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );

    if (check1.rows.length > 0 || check2.rows.length > 0) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Insert into pending_doctor
    const result = await pool.query(
      `INSERT INTO pending_doctor
        (username, password, name, age, gender, contacts, speciality, details)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING pending_id`,
      [username, password, name, age, genderenum, contacts, speciality, details]
    );

    const pending_id = result.rows[0].pending_id;

    // Insert degrees
    for (const degree of degrees) {
      const { degree_id, institute, year_of_passing } = degree;
      await pool.query(
        `INSERT INTO pending_degree
         (pending_id, degree_id, institute, year_of_passing)
         VALUES ($1, $2, $3, $4)`,
        [pending_id, degree_id, institute, year_of_passing]
      );
    }

    res
      .status(200)
      .json({ message: "Doctor registration submitted for approval." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed." + err });
  }
});

module.exports = router;
