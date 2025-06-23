const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
router.post("/register", async (req, res) => {
  try {
    const { username, password, name, age, contact_no, address, gender } =
      req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      return res.status(401).send("username not available");
    }

    //hashing
    const saltround = 10;
    const gensalt = await bcrypt.genSalt(saltround);
    const bcryptpassword = await bcrypt.hash(password, gensalt);
    console.log(bcryptpassword);

    //insert
    const newuser = await pool.query(
      "insert into accounts(username,password,role) values ($1,$2,'PAT') returning *",
      [username, bcryptpassword]
    );
    console.log("insertion complete");
    //res.json(newuser.rows[0]);
    //return res.status(201).send("insertion successful");

    //token
    const patienttableupdate = await pool.query(
      `insert into 
      patient(name,age,contact_no,address,gender,user_id) values
      ($1,$2,$3,$4,$5,$6)`,
      [name, age, contact_no, address, gender, newuser.rows[0].user_id]
    );
    const token = jwtGenerator(newuser.rows[0].user_id);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error" + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length == 0) {
      return res.status(401).json("invalid username or password");
    }
    const validpass = await bcrypt.compare(password, result.rows[0].password);

    console.log(validpass);
    if (!validpass) {
      return res.status(401).json("invalid username or password");
    }
    const token = jwtGenerator(result.rows[0].user_id);
    res.json({ token });
    return res.status(200);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/register/admin", async (req, res) => {
  try {
    const { username, password, name, branch_id } = req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      return res.status(401).send("username not available");
    }

    //hashing
    const saltround = 10;
    const gensalt = await bcrypt.genSalt(saltround);
    const bcryptpassword = await bcrypt.hash(password, gensalt);
    console.log(bcryptpassword);

    //insert
    const newuser = await pool.query(
      "insert into accounts(username,password,role) values ($1,$2,'ADM') returning *",
      [username, bcryptpassword]
    );
    console.log("insertion complete in admin");
    //res.json(newuser.rows[0]);
    //return res.status(201).send("insertion successful");

    //token
    const admintableupdate = await pool.query(
      `insert into 
      admin(name,branch_id,user_id) values
      ($1,$2,$3)`,
      [name, branch_id, newuser.rows[0].user_id]
    );
    const token = jwtGenerator(newuser.rows[0].user_id);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error" + err);
  }
});

router.post("/login/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length == 0) {
      return res.status(401).json("invalid username or password");
    }
    const validpass = await bcrypt.compare(password, result.rows[0].password);

    console.log(validpass);
    if (!validpass) {
      return res.status(401).json("invalid username or password");
    }
    const token = jwtGenerator(result.rows[0].user_id);
    res.json({ token });
    return res.status(200);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/register/doctor", async (req, res) => {
  try {
    const { username, password, name, age, gender, contacts, speciality } =
      req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      return res.status(401).send("username not available");
    }

    //hashing
    const saltround = 10;
    const gensalt = await bcrypt.genSalt(saltround);
    const bcryptpassword = await bcrypt.hash(password, gensalt);
    console.log(bcryptpassword);

    //insert
    const newuser = await pool.query(
      "insert into accounts(username,password,role) values ($1,$2,'DOC') returning *",
      [username, bcryptpassword]
    );
    console.log("insertion complete in doctor");
    //res.json(newuser.rows[0]);
    //return res.status(201).send("insertion successful");

    //token
    const doctortableupdate = await pool.query(
      `insert into 
      doctor(name,age,gender,contacts,speciality,user_id) values
      ($1,$2,$3,$4,$5,$6)`,
      [name, age, gender, contacts, speciality, newuser.rows[0].user_id]
    );
    const token = jwtGenerator(newuser.rows[0].user_id);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error" + err);
  }
});

router.post("/login/doctor", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "select * from accounts where username = $1",
      [username]
    );
    if (result.rows.length == 0) {
      return res.status(401).json("invalid username or password");
    }
    const validpass = await bcrypt.compare(password, result.rows[0].password);

    console.log(validpass);
    if (!validpass) {
      return res.status(401).json("invalid username or password");
    }
    const token = jwtGenerator(result.rows[0].user_id);
    res.json({ token });
    return res.status(200);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
