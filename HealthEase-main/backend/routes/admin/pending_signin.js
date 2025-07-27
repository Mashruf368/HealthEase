const express = require("express");
const pool = require("../../db");
//const authorization = require("../middleware/authorizeadmin");
const authorizeadmin = require("../../middleware/authorizeadmin");
const router = express.Router();

router.get("/admin/pending", authorizeadmin, async (req, res) => {
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
