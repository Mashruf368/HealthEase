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

module.exports = router;
