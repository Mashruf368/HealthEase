const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());
require("dotenv").config();

const jwtreg = require("./routes/jwtauth");
const validtest = require("./routes/is_verify");
const profile = require("./routes/profile");
const appointment = require("./routes/appointment");
const appointment_admin = require("./routes/appointment_admin");
const presc = require("./routes/Prescription/prescription");
const writepresc = require("./routes/Prescription/write_prescription");
const dash_doc = require("./routes/dashboard/doctors");
const profileRoute = require("./routes/profile_role");
const prev_presc = require("./routes/Patient/prev_appointments");
app.use("/", profile);

app.use("/api", profileRoute);
app.use("/", dash_doc);
app.use("/", appointment);
app.use("/", appointment_admin);
app.use("/", presc);
app.use("/", prev_presc);
app.use("/newreg", jwtreg);
app.use("/a", validtest);

app.use("/", writepresc);

app.get("/testing", async (req, res) => {
  res.send("hello how hi are u");
});
app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM accounts"); // Query the current time from PostgreSQL
    res.json(result.rows); // Send the result back to the client
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
