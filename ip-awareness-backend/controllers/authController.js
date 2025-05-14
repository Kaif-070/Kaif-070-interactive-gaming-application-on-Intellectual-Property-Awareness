const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const JWT_SECRET = "your_super_secret_key"; 

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: users[0].id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username: users[0].username });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
