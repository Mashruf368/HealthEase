const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

router.get("/me", async (req, res) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) return res.status(403).json("Not authorized");

    const secret = "EidMubarak2";
    const payload = jwt.verify(jwtToken, secret);
    const user_id = payload.user;

    const user = await pool.query("SELECT role FROM accounts WHERE user_id = $1", [user_id]);
    if (user.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json({ role: user.rows[0].role });
  } catch (err) {
    return res.status(401).json("Unauthorized");
  }
});

module.exports = router;
