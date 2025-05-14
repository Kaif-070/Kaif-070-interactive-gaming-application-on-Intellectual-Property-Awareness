const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/update", (req, res) => {
  const { username, points } = req.body;

  if (!username || points === undefined) {
    return res.status(400).json({ error: "Username and points are required" });
  }

  const sql = "UPDATE users SET points = ? WHERE username = ?";
  db.query(sql, [points, username], (err, result) => {
    if (err) {
      console.error("Error updating points:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ success: true, message: "Points updated successfully" });
  });
});

module.exports = router;
