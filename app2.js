const express = require("express");
const pool = require("./app"); // Import the db.js file
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(express.json()); // Parse JSON bodies
// Example route to test connection
app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM branch"); // Query the current time from PostgreSQL
    res.json(result.rows); // Send the result back to the client
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

app.put("/update", async (req, res) => {
  const { team, goals } = req.body;
  try {
    const result = await pool.query(
      "UPDATE epl SET goals = $1 WHERE team = $2 RETURNING *",
      [goals, team]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating team goals");
  }
});

app.delete("/delete", async (req, res) => {
  const { team } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM epl WHERE team = $1 RETURNING *",
      [team]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting team");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM accounts WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
