const jwt = require("jsonwebtoken");

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
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Unauthorized");
  }
};
