const express = require("express");
const pool = require("./db");
const app = express();
const PORT = 3001;

app.use(express.json());
require("dotenv").config();

const jwtreg = require("./routes/jwtauth");
const validtest = require("./routes/is_verify");
const profile = require("./routes/profile");
const appointment = require("./routes/appointment");
const appointment_admin = require("./routes/appointment_admin");
const presc = require("./routes/Prescription/prescription");
app.use("/newreg", jwtreg);
app.use("/a", validtest);
app.use("/a", profile);
app.use("/a", appointment);
app.use("/a", appointment_admin);
app.use("/a", presc);

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
