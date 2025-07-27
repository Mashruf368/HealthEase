const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(403).json("not authorized");
  }
});

module.exports = router;
