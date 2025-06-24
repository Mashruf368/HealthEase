const express = require("express");
const pool = require("../../db");
const authorization = require("../../middleware/authorization");
const router = express.Router();

router.post("/doctors",authorization, async (req, res) => {
  try {
    const result = await pool.query(`select * from doctor`);
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(401).json("error " + err);
  }
});
module.exports = router;
