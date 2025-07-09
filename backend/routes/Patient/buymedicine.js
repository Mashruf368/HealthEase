const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.get("/profile/buymedicine/:id", authorization, async (req, res) => {
  try {
    const userid = req.user;
    const medid = req.params.id;
    const detailsResult = await pool.query(
      `
        
        `,
      [pid]
    );

    const medsResult = await pool.query(
      `
      SELECT medicine_id, dosage, duration
      FROM prescribed_meds
      WHERE consultation_id = $1
      `,
      [pid]
    );

    const testsResult = await pool.query(
      `
      SELECT test_id, test_result,comments
      FROM recommended_tests
      WHERE consultation_id = $1
      `,
      [pid]
    );

    // Combine and return all data
    return res.status(200).json({
      prescription: detailsResult.rows[0] || {},
      medicines: medsResult.rows,
      tests: testsResult.rows,
    });
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

module.exports = router;
