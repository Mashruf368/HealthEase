const express = require("express");
const pool = require("../db");
const router = express.Router();
const app = express();

router.post("/patient", async (req, res) => {
  const { username, password, name, address, gender, age, contact_no } =
    req.body;
  let roles = "PAT";

  if (!username || !password || !name || !contact_no) {
    return res.status(400).send("username or password cannot be null");
  }
  const check = await pool.query("SELECT * from accounts where username = $1", [
    username,
  ]);
  if (check.rows.length > 0) {
    return res.status(400).send("Username already exists");
  }
  try {
    const result = await pool.query(
      "INSERT INTO accounts(username,password,role) values($1,$2,$3) returning user_id",
      [username, password, roles]
    );
    const user_id = result.rows[0].user_id;
    const result2 = await pool.query(
      "INSERT INTO patient(user_id,name,address,gender,age,contact_no) values($1,$2,$3,$4,$5,$6) returning patient_id",
      [user_id, name, address, gender, age, contact_no]
    );
    res.status(201).json({
      message: "User registered",
      userId: user_id,
      patientId: result2.rows[0].patient_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user" + err);
  }
});

module.exports = router;
