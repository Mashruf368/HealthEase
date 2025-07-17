const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/shifts", authorization, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT shift_no, name, start_time, end_time
      FROM shift
      ORDER BY shift_no
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching shift data:", err); // ✅ Debugging aid
    res.status(500).json({ error: "Server error while fetching shifts" }); // ✅ Use proper status
  }
});

module.exports = router;
