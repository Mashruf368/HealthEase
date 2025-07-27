// // const router = require("express").Router();
// // const pool = require("../../db");
// // const authorization = require("../../middleware/authorization");

// // router.post("/admin/buy/:id", authorization, async (req, res) => {
// //   try {
// //     const prescid = req.params.id;
// //     const bbb = await pool.query(
// //       `
// //         select * from prescription where consultation_id= $1`,
// //       [prescid]
// //     );
// //     const patientid = bbb.rows[0].patient_id;
// //     const { item_type, item_id, amount, created_at } = req.body;
// //     console.log(patientid, item_id, amount, created_at);
// //     if (item_type == 1) {
// //       // Get medicine cost
// //       const a = await pool.query(
// //         `SELECT cost FROM medicine WHERE medicine_id = $1`,
// //         [item_id]
// //       );

// //       if (a.rows.length === 0) {
// //         return res.status(404).json({ error: "Medicine not found" });
// //       }

// //       const cst = a.rows[0].cost;
// //       const finalcost = cst * amount;

// //       // Insert transaction
// //       await pool.query(
// //         `
// //         INSERT INTO transaction(patient_id, item_type, item_id, amount, cost, created_at, state)
// //         VALUES ($1, 'medicine', $2, $3, $4, $5, 'P')
// //         `,
// //         [patientid, item_id, amount, finalcost, created_at]
// //       );

// //       return res.status(200).json({ message: "Transaction recorded" });
// //     } else if (item_type == 2) {
// //       const a = await pool.query(`SELECT cost FROM tests WHERE test_id = $1`, [
// //         item_id,
// //       ]);

// //       if (a.rows.length === 0) {
// //         return res.status(404).json({ error: "test not found" });
// //       }

// //       const finalcost = a.rows[0].cost;

// //       // Insert transaction
// //       await pool.query(
// //         `
// //         INSERT INTO transaction(patient_id, item_type, item_id, amount, cost, created_at, state)
// //         VALUES ($1, 'test', $2, 1, $4, $5, 'P')
// //         `,
// //         [patientid, item_id, finalcost, created_at]
// //       );
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Server error: " + err.message });
// //   }
// // });

// // module.exports = router;
// const router = require("express").Router();
// const pool = require("../../db");
// const authorization = require("../../middleware/authorization");

// router.post("/admin/buy/:id", authorization, async (req, res) => {
//   try {
//     const prescid = req.params.id;

//     // Get patient_id from prescription table using consultation_id
//     const bbb = await pool.query(
//       `SELECT patient_id FROM prescription WHERE consultation_id = $1`,
//       [prescid]
//     );

//     if (bbb.rows.length === 0) {
//       return res.status(404).json({ error: "Prescription not found" });
//     }

//     const patientid = bbb.rows[0].patient_id;
//     const { item_type, item_id, amount, created_at } = req.body;

//     console.log(patientid, item_id, amount, created_at);

//     if (item_type == 1) {
//       // 💊 Handle medicine
//       const a = await pool.query(
//         `SELECT cost FROM medicine WHERE medicine_id = $1`,
//         [item_id]
//       );

//       if (a.rows.length === 0) {
//         return res.status(404).json({ error: "Medicine not found" });
//       }

//       const cst = a.rows[0].cost;
//       const finalcost = cst * amount;

//       await pool.query(
//         `INSERT INTO transaction(patient_id, item_type, item_id, amount, cost, created_at, state)
//          VALUES ($1, 'medicine', $2, $3, $4, $5, 'P')`,
//         [patientid, item_id, amount, finalcost, created_at]
//       );

//       return res.status(200).json({ message: "Medicine transaction recorded" });
//     } else if (item_type == 2) {
//       // 🧪 Handle test
//       const a = await pool.query(`SELECT cost FROM tests WHERE test_id = $1`, [
//         item_id,
//       ]);

//       if (a.rows.length === 0) {
//         return res.status(404).json({ error: "Test not found" });
//       }

//       const finalcost = a.rows[0].cost;

//       await pool.query(
//         `INSERT INTO transaction(patient_id, item_type, item_id, amount, cost, created_at, state)
//          VALUES ($1, 'test', $2, 1, $3, $4, 'P')`,
//         [patientid, item_id, finalcost, created_at] // ❌ Wrong order!
//         // should be: [patientid, item_id, 1, finalcost, created_at]
//       );

//       return res.status(200).json({ message: "Test transaction recorded" });
//     } else {
//       return res.status(400).json({ error: "Invalid item type" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error: " + err.message });
//   }
// });

// module.exports = router;
const router = require("express").Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

router.post("/admin/buy/:id", authorization, async (req, res) => {
  try {
    const prescid = req.params.id;

    // Get patient_id from prescription using consultation_id
    const result = await pool.query(
      `SELECT patient_id FROM prescription WHERE consultation_id = $1`,
      [prescid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    const patientid = result.rows[0].patient_id;
    const { item_type, item_id, amount, created_at } = req.body;

    if (!item_type || !item_id || !created_at) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (item_type == 1) {
      // 💊 Handle medicine
      const medResult = await pool.query(
        `SELECT cost FROM medicine WHERE medicine_id = $1`,
        [item_id]
      );

      if (medResult.rows.length === 0) {
        return res.status(404).json({ error: "Medicine not found" });
      }

      const cost = medResult.rows[0].cost;
      const finalCost = cost * amount;

      await pool.query(
        `INSERT INTO transaction (patient_id, item_type, item_id, amount, cost, created_at, state)
         VALUES ($1, 'medicine', $2, $3, $4, $5, 'P')`,
        [patientid, item_id, amount, finalCost, created_at]
      );

      return res.status(200).json({ message: "Medicine transaction recorded" });
    } else if (item_type == 2) {
      // 🧪 Handle test
      const testResult = await pool.query(
        `SELECT cost FROM tests WHERE test_id = $1`,
        [item_id]
      );

      if (testResult.rows.length === 0) {
        return res.status(404).json({ error: "Test not found" });
      }

      const finalCost = testResult.rows[0].cost;

      await pool.query(
        `INSERT INTO transaction (patient_id, item_type, item_id, amount, cost, created_at, state)
         VALUES ($1, 'test', $2, 1, $3, $4, 'P')`,
        [patientid, item_id, finalCost, created_at]
      );

      return res.status(200).json({ message: "Test transaction recorded" });
    } else {
      return res.status(400).json({ error: "Invalid item_type" });
    }
  } catch (err) {
    console.error("Transaction insert error:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

router.post("/pharmacist/buy/:id", authorization, async (req, res) => {
  try {
    const prescid = req.params.id;

    // Get patient_id from prescription using consultation_id
    const result = await pool.query(
      `SELECT patient_id FROM prescription WHERE consultation_id = $1`,
      [prescid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    const patientid = result.rows[0].patient_id;
    const { item_type, item_id, amount, created_at } = req.body;

    if (!item_type || !item_id || !created_at) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // 💊 Handle medicine
    const medResult = await pool.query(
      `SELECT cost FROM medicine WHERE medicine_id = $1`,
      [item_id]
    );

    if (medResult.rows.length === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    const cost = medResult.rows[0].cost;
    const finalCost = cost * amount;

    await pool.query(
      `INSERT INTO transaction (patient_id, item_type, item_id, amount, cost, created_at, state)
         VALUES ($1, 'medicine', $2, $3, $4, $5, 'P')`,
      [patientid, item_id, amount, finalCost, created_at]
    );

    return res.status(200).json({ message: "Medicine transaction recorded" });
  } catch (err) {
    console.error("Transaction insert error:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
