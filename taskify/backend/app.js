require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conn = require("./conn/conn");  
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
const authenticateToken = require('./routes/auth');

const PORT = process.env.PORT || 4000;
const app = express();

// List of allowed origins
const allowedOrigins = [
  //'http://localhost:3000',  // Development origin
  'https://taskifywebapp.netlify.app' // Production origin
];

// Middleware for CORS with dynamic origin handling
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without an origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    
    // If the origin is allowed, set it in the response
    return callback(null, true);
  },
  credentials: true // Enable Access-Control-Allow-Credentials
}));

// Custom headers to manage CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Dynamically allow the origin if it's in the allowedOrigins array
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
conn();

// Routes
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI); 

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from the backend side");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
