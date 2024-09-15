require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const conn = require("./conn/conn");  
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
const PORT = process.env.PORT || 4000;
const app = express();
const authenticateToken = require('./routes/auth');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Database connection
conn();

// Routes
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI); 

app.get("/", (req, res) => {
  res.send("Hello from the backend side");
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
