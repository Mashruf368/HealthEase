const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
router.post("/register", async (req, res) => {
  try {
    // const { username, password, name, age, contact_no, address, gender } =
    //   req.body;
    // const result = await pool.query(
    //   "select * from accounts where username = $1",
    //   [username]
    // );
    // if (result.rows.length > 0) {
    //   return res.status(401).send("username not available");
    // }

    // //hashing
    // const saltround = 10;
    // const gensalt = await bcrypt.genSalt(saltround);
    // const bcryptpassword = await bcrypt.hash(password, gensalt);
    // console.log(bcryptpassword);

    // //insert
    // const newuser = await pool.query(
    //   "insert into accounts(username,password,role) values ($1,$2,'PAT') returning *",
    //   [username, bcryptpassword]
    // );
    // console.log("insertion complete");
    // //res.json(newuser.rows[0]);
    // //return res.status(201).send("insertion successful");

    // //token
    // const patienttableupdate = await pool.query(
    //   `insert into
    //   patient(name,age,contact_no,address,gender,user_id) values
    //   ($1,$2,$3,$4,$5,$6)`,
    //   [name, age, contact_no, address, gender, newuser.rows[0].user_id]
    // );
    // const token = jwtGenerator(newuser.rows[0].user_id);
    // return res.status(200).json({ token });
    const { username, password, name, age, contact_no, address, gender } =
      req.body;

    // Check if username is already taken
    const userExists = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(401).send("Username not available");
    }

    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and let trigger insert into 'patient'
    const newUser = await pool.query(
      `INSERT INTO accounts (username, password, role, extra_data)
       VALUES ($1, $2, 'PAT', $3)
       RETURNING user_id`,
      [
        username,
        hashedPassword,
        {
          name,
          age,
          contact_no,
          address,
          gender,
        }, // extra_data JSON
      ]
    );

    // Generate JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);
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

// router.post("/login/admin", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const result = await pool.query(
//       "select * from accounts where username = $1",
//       [username]
//     );
//     if (result.rows.length == 0) {
//       return res.status(401).json("invalid username or password");
//     }
//     const validpass = await bcrypt.compare(password, result.rows[0].password);

//     console.log(validpass);
//     if (!validpass) {
//       return res.status(401).json("invalid username or password");
//     }
//     const token = jwtGenerator(result.rows[0].user_id);
//     res.json({ token });
//     return res.status(200);
//   } catch (err) {
//     res.status(401).send(err);
//   }
// });
async function loginAdminType(req, res, requiredType = null) {
  try {
    const { username, password } = req.body;

    console.log("in login admin backend");
    const result = await pool.query(
      `SELECT a.user_id, a.password, ad.type
       FROM accounts a
       LEFT JOIN admin ad ON a.user_id = ad.user_id
       WHERE a.username = $1 AND a.role = 'ADM'`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json("Invalid username or password");
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json("Invalid username or password");
    }

    // Validate role type
    if (requiredType === null && user.type !== null) {
      return res.status(403).json("Access denied: Not an admin");
    }
    if (requiredType && user.type !== requiredType) {
      return res.status(403).json(`Access denied: Not a ${requiredType}`);
    }

    const token = jwtGenerator(user.user_id);
    return res.status(200).json({ token, type: user.type || "admin" });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error: " + err.message);
  }
}

// Admin login (type is null)
router.post("/login/admin", async (req, res) => {
  await loginAdminType(req, res, null);
});

// Pharmacist login
router.post("/login/pharmacist", async (req, res) => {
  await loginAdminType(req, res, "pharmacist");
});

// Pathologist login
router.post("/login/pathologist", async (req, res) => {
  await loginAdminType(req, res, "pathologist");
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
