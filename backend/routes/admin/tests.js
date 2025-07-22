const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

// Update test result and set current date
router.post(
  "/pathologist/test-result/:id1/:id2",
  authorization,
  async (req, res) => {
    const testid = req.params.id1;
    const consultid = req.params.id2;
    const { result } = req.body;

    try {
      // Ensure result is provided
      if (!result) {
        return res.status(400).json({ error: "Result is required" });
      }

      await pool.query(
        `UPDATE recommended_tests
       SET test_result = $1,
           updated_at = CURRENT_DATE
       WHERE test_id = $2 and consultation_id = $3`,
        [result, testid, consultid]
      );

      res.status(200).json({ message: "Result saved successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


router.get("/pathologist/patient/:id/tests", authorization, async (req, res) => {
  const patientId = req.params.id;

  try {
    const result = await pool.query(
      `
      SELECT rt.test_id, rt.test_result, rt.updated_at, rt.consultation_id, rt.comments,
             t.test_name
      FROM recommended_tests rt
      JOIN tests t ON rt.test_id = t.test_id
      JOIN prescription p ON rt.consultation_id = p.consultation_id
      WHERE p.patient_id = $1
      ORDER BY rt.updated_at DESC NULLS LAST, rt.consultation_id DESC
      `,
      [patientId]
    );

    res.status(200).json({ tests: result.rows });
  } catch (err) {
    console.error("Error fetching patient test history:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
