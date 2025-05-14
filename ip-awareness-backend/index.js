const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const pointsRoutes = require("./routes/points");
const leaderboardRoutes = require('./routes/leaderboard');


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/points", pointsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
