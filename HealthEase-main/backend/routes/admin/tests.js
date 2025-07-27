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

router.get(
  "/pathologist/patient/:id/tests",
  authorization,
  async (req, res) => {
    const patientId = req.params.id;

    try {
      const result = await pool.query(
        `
      SELECT rt.test_id, rt.test_result, rt.updated_at, rt.consultation_id, rt.comments,rt.payment_state,rt.test_number,
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
      res.status(500).json({ error: "Internal Server Error" + err });
    }
  }
);

// router.post(
//   "/pathologist/test/payment/:id3",
//   authorization,
//   async (req, res) => {
//     // const testid = req.params.id1;
//     // const patientid = req.params.id2;
//     const testnumber = req.params.id3;
//     console.log(testid + " " + patientid + " " + testnumber);
//     const testid = await pool.query(
//       `select test_id from recommended_tests
//       where test_number = $1`,
//       [testnumber]
//     );

//     const patientid = await pool.query(
//       `select patient_id from recommended_tests
//       where test_number = $1`,
//       [testnumber]
//     );

//     try {
//       // Get cost of the test
//       const costResult = await pool.query(
//         `SELECT cost FROM tests WHERE test_id = $1`,
//         [testid]
//       );

//       const cost = costResult.rows[0]?.cost;
//       if (cost === undefined) {
//         return res.status(400).json({ error: "Test not found" });
//       }

//       // Get current account balance
//       const balanceResult = await pool.query(
//         `SELECT account_balance FROM payment WHERE patient_id = $1`,
//         [patientid]
//       );

//       const currentBalance = balanceResult.rows[0]?.account_balance;
//       if (currentBalance === undefined) {
//         return res
//           .status(400)
//           .json({ error: "Patient payment info not found" });
//       }

//       // Calculate new balance
//       const newBalance = currentBalance - cost;

//       // Update account balance
//       await pool.query(
//         `UPDATE payment SET account_balance = $1 WHERE patient_id = $2`,
//         [newBalance, patientid]
//       );

//       // Update payment state
//       await pool.query(
//         `UPDATE recommended_tests SET payment_state = $1 WHERE test_number = $2`,
//         ["C", testnumber]
//       );

//       res
//         .status(200)
//         .json({ message: "Payment confirmed and balance updated" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

router.post(
  "/pathologist/test/payment/:id3",
  authorization,
  async (req, res) => {
    const testnumber = req.params.id3;
    console.log("Test number:", testnumber);

    try {
      // Get test_id and patient_id from the test_number
      const testResult = await pool.query(
        `SELECT rt.test_id, pr.patient_id 
         FROM recommended_tests rt
         JOIN prescription pr ON rt.consultation_id = pr.consultation_id
         WHERE rt.test_number = $1`,
        [testnumber]
      );

      if (testResult.rows.length === 0) {
        return res.status(400).json({ error: "Test not found" });
      }

      const testid = testResult.rows[0].test_id;
      const patientid = testResult.rows[0].patient_id;

      // Get cost of the test
      const costResult = await pool.query(
        `SELECT cost FROM tests WHERE test_id = $1`,
        [testid]
      );

      const cost = costResult.rows[0]?.cost;
      if (cost === undefined) {
        return res.status(400).json({ error: "Test cost not found" });
      }

      // Get current account balance
      const balanceResult = await pool.query(
        `SELECT account_balance FROM payment WHERE patient_id = $1`,
        [patientid]
      );

      const currentBalance = balanceResult.rows[0]?.account_balance;
      if (currentBalance === undefined) {
        return res
          .status(400)
          .json({ error: "Patient payment info not found" });
      }

      // Check if patient has sufficient balance
      if (currentBalance < cost) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Calculate new balance
      const newBalance = currentBalance - cost;

      // Update account balance
      await pool.query(
        `UPDATE payment SET account_balance = $1 WHERE patient_id = $2`,
        [newBalance, patientid]
      );

      // Update payment state
      await pool.query(
        `UPDATE recommended_tests SET payment_state = $1 WHERE test_number = $2`,
        ["C", testnumber]
      );

      res
        .status(200)
        .json({ message: "Payment confirmed and balance updated" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;

// router.post(
//   "/pathologist/test/payment/:id1/:id2/:id3",
//   authorization,
//   async (req, res) => {
//     const testid = req.params.id1;
//     const patientid = req.params.id2;
//     const testnumber = req.params.id3;

//     try {
//       const cost = await pool.query(
//         `select cost from tests where test_id = $1`,
//         [testid]
//       );

//       const result = await pool.query(
//         `update payment
//         set account_balance = $1
//         where patient_id = $2`,
//         [account_balance - cost, patientid]
//       );

//       const result2 = await pool.query(
//         `update recommended_tests
//         set payment_state = $1
//         where test_number = $2`,
//         ["C", testnumber]
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
