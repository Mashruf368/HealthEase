const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/profile", authorization, async (req, res) => {
  try {
    const userid = req.user;
    const result = await pool.query(
      "select * from patient where user_id = $1",
      [userid]
    );
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(401).json("error" + err);
  }
});

router.patch("/profile", authorization, async (req, res) => {
  try {
    const userid = req.user;
    const { name, age, gender, contact_no, address } = req.body;
    const result1 = await pool.query(
      "select * from patient where user_id = $1",
      [userid]
    );
    if (result1.rows.length > 0) {
      const result = await pool.query(
        `UPDATE patient 
         SET name = $1, age = $2, gender = $3, contact_no = $4, address = $5 
         WHERE user_id = $6 
         RETURNING *`,
        [name, age, gender, contact_no, address, userid]
      );
      res.status(201).json("successfully updated" + result.rows[0]);
    } else {
      const result = await pool.query(
        `INSERT INTO patient (user_id, name, age, gender, contact_no, address) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [userid, name, age, gender, contact_no, address]
      );

      res.status(201).json({
        message: "Successfully inserted",
        insertedData: result.rows[0],
      });
    }
  } catch (err) {
    res.status(401).json("error " + err);
  }
});

router.get(
  "/profile/transactions/medicine",
  authorization,
  async (req, res) => {
    try {
      const userid = req.user;

      const pidResult = await pool.query(
        `SELECT patient_id FROM patient WHERE user_id = $1`,
        [userid]
      );

      if (pidResult.rowCount === 0) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const patientId = pidResult.rows[0].patient_id;

      const result = await pool.query(
        `SELECT * FROM transaction WHERE patient_id = $1 AND item_type = $2`,
        [patientId, "medicine"]
      );

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/profile/transactions/test", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const pidResult = await pool.query(
      `SELECT patient_id FROM patient WHERE user_id = $1`,
      [userid]
    );

    if (pidResult.rowCount === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientId = pidResult.rows[0].patient_id;

    const result = await pool.query(
      `SELECT * FROM transaction WHERE patient_id = $1 AND item_type = $2`,
      [patientId, "test"]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile/tests", authorization, async (req, res) => {
  try {
    const userid = req.user;

    const pidResult = await pool.query(
      `SELECT patient_id FROM patient WHERE user_id = $1`,
      [userid]
    );

    if (pidResult.rowCount === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientId = pidResult.rows[0].patient_id;

    const result = await pool.query(
      `SELECT b.test_name,a.test_result,a.comments
      FROM recommended_tests a,tests b
       WHERE a.test_id = b.test_id
       and patient_id = $1 `,
      [patientId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
