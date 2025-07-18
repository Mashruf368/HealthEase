const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.post("/admin/buy/:id", authorization, async (req, res) => {
  try {
    const prescid = req.params.id;
    const bbb = await pool.query(
      `
        select * from prescription where consultation_id= $1`,
      [prescid]
    );
    const patientid = bbb.rows[0].patient_id;
    const { item_type, item_id, amount, created_at } = req.body;
    console.log(patientid, item_id, amount, created_at);
    if (item_type == 1) {
      // Get medicine cost
      const a = await pool.query(
        `SELECT cost FROM medicine WHERE medicine_id = $1`,
        [item_id]
      );

      if (a.rows.length === 0) {
        return res.status(404).json({ error: "Medicine not found" });
      }

      const cst = a.rows[0].cost;
      const finalcost = cst * amount;

      // Insert transaction
      await pool.query(
        `
        INSERT INTO transaction(patient_id, item_type, item_id, amount, cost, created_at, state)
        VALUES ($1, 'medicine', $2, $3, $4, $5, 'P')
        `,
        [patientid, item_id, amount, finalcost, created_at]
      );

      return res.status(200).json({ message: "Transaction recorded" });
    } else {
      return res.status(400).json({ error: "Invalid item type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
