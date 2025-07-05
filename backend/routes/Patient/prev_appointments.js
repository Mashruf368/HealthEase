const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get("/profile/prescriptions", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const stuff = await pool.query(`select * from patient where user_id = $1`, [
      userid,
    ]);
    const patid = stuff.rows[0].patient_id;
    console.log(patid);
    const result = await pool.query(
      "select * from prescription where patient_id = $1",
      [patid]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

module.exports = router;
