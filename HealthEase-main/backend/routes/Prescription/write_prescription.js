const express = require("express");
const pool = require("../../db");
//const authorization = require("../../middleware/authorization");
const authorizedoctor = require("../../middleware/authorizedoctor");
const router = express.Router();

router.post(
  "/doctor/appointments/:id/prescription",
  authorizedoctor,
  async (req, res) => {
    //const client = await pool.connect();
    try {
      const appointmentId = req.params.id;
      const doctorId = req.user;
      const dctr = await pool.query(`select * from doctor where user_id = $1`, [
        doctorId,
      ]);
      const doctorUserId = dctr.rows[0].doctor_id;
      console.log(doctorUserId);

      const appointment = await pool.query(
        `SELECT * FROM appointment WHERE appointment_id = $1`,
        [appointmentId]
      );

      const patientId = appointment.rows[0].patient_id;

      const { symptoms, comments, date, medicines, tests, surgeries } =
        req.body;
      // console.log(medicines);
      // console.log(tests);
      // console.log(surgeries);
      console.log("Prescription request body:", req.body);

      // Insert into prescription
      const prescriptionResult = await pool.query(
        `INSERT INTO prescription (patient_id, doctor_id, appointment_id, symptoms, comments, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING consultation_id`,
        [patientId, doctorUserId, appointmentId, symptoms, comments, date]
      );

      const consultationId = prescriptionResult.rows[0].consultation_id;
      console.log(consultationId);
      // Insert prescribed medicines
      if (Array.isArray(medicines)) {
        for (let med of medicines) {
          await pool.query(
            `INSERT INTO prescribed_meds (consultation_id, medicine_id, dosage, duration)
           VALUES ($1, $2, $3, $4)`,
            [consultationId, med.medicine_id, med.dosage, med.duration]
          );
        }
      }

      // Insert prescribed tests
      if (Array.isArray(tests)) {
        for (let test of tests) {
          await pool.query(
            `INSERT INTO recommended_tests (consultation_id, test_id, comments,patient_id,payment_state)
           VALUES ($1, $2, $3,$4,$5)`,
            [consultationId, test.test_id, test.notes, patientId, "P"]
          );
        }
      }

      // Insert prescribed surgeries
      if (Array.isArray(surgeries)) {
        for (let surgery of surgeries) {
          await pool.query(
            `INSERT INTO prescribed_surgery (consultation_id, surgery_id, remarks)
           VALUES ($1, $2, $3)`,
            [consultationId, surgery.surgery_id, surgery.remarks]
          );
        }
      }

      // await pool.query(
      //   `UPDATE appointment SET status = 'C' WHERE appointment_id = $1`,
      //   [appointmentId]
      // );
      //console.log(hello);

      //await client.query("COMMIT");
      res.status(201).json({
        message: "Prescription and associated records added successfully",
      });
    } catch (err) {
      //await client.query("ROLLBACK");
      console.log(err);
      console.error(err);
      res.status(500).json({ error: "Server error" + err });
    } finally {
      //client.release();
    }
  }
);
module.exports = router;
