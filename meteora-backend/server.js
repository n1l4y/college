const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const requestIp = require("request-ip");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(requestIp.mw()); // Middleware to get client IP

// Routes
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  const message = `JWT Secret: ${process.env.JWT_SECRET} - Backend Home!`;
  res.send(message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
