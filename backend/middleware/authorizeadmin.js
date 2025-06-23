const jwt = require("jsonwebtoken");
const pool = require("../db");

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not authorized");
    }
    const secret = "EidMubarak2";
    const payload = jwt.verify(jwtToken, secret);
    req.user = payload.user;
    console.log("token " + jwtToken);
    console.log("payload " + payload);
    const user = await pool.query(`select * from accounts where user_id = $1`, [
      req.user,
    ]);
    if (user.rows[0].role == "ADM") {
      next();
    } else {
      return res.status(403).json("Admin access required");
    }
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Unauthorized");
  }
};
