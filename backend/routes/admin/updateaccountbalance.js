const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.post(
  "/pharmacist/patient/:id/update",
  authorization,
  async (req, res) => {
    try {
      const { amount } = req.body;
      const patid = req.params.id;

      const result = await pool.query(
        `UPDATE payment
       SET account_balance = $1
       WHERE patient_id = $2
       RETURNING account_balance`,
        [amount, patid]
      );

      res.status(200).json({ balance: result.rows[0].account_balance });
    } catch (err) {
      console.error("Balance update error:", err);
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
);

//for buying

router.post(
  "/pharmacist/confirm/:transaction_id",
  authorization,
  async (req, res) => {
    try {
      const { transaction_id } = req.params;

      // Get transaction details
      const txQuery = await pool.query(
        `SELECT * FROM transaction WHERE transaction_id = $1`,
        [transaction_id]
      );

      if (txQuery.rows.length === 0)
        return res.status(404).json({ error: "Transaction not found" });

      const txn = txQuery.rows[0];
      if (txn.state === "A")
        return res.status(400).json({ error: "Transaction already confirmed" });

      const { cost, patient_id, item_id } = txn;

      // Deduct from account balance
      await pool.query(
        `UPDATE payment SET account_balance = account_balance - $1
       WHERE patient_id = $2`,
        [cost, patient_id]
      );

      // Update transaction state to 'A' (approved)
      await pool.query(
        `UPDATE transaction SET state = 'A' WHERE transaction_id = $1`,
        [transaction_id]
      );

      // Get medicine name
      const med = await pool.query(
        `SELECT name FROM medicine WHERE medicine_id = $1`,
        [item_id]
      );

      res.status(200).json({
        ...txn,
        state: "A",
        name: med.rows[0]?.name || "Unknown",
      });
    } catch (err) {
      console.error("Confirm purchase error:", err);
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
);

router.get("/payment/balance/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT account_balance FROM payment WHERE patient_id = $1`,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Patient not found" });

    res.status(200).json({ balance: result.rows[0].account_balance });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
