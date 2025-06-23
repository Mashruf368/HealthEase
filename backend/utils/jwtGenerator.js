const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  const secret = "EidMubarak2";
  console.log("JWT secret:", process.env.jwtSecret);

  return jwt.sign(payload, secret, { expiresIn: "20h" });
}

module.exports = jwtGenerator;
