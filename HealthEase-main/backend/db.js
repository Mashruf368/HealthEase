// db.js
const { Pool } = require("pg");

// Set up the connection pool (adjust these with your actual database credentials)
const pool = new Pool({
  user: "postgres", // replace with your PostgreSQL username
  host: "localhost", // or the address where your PostgreSQL server is running
  database: "hospital", // replace with your database name
  password: "rafin30", // replace with your PostgreSQL password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
