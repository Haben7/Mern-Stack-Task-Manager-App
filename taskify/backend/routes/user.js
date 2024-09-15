// Require dotenv at the top of your main server file
require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign-Up (Register) Route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username should have at least 3 characters" });
    }

    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
router.post('/log-in', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check if JWT_SECRET is loaded correctly
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Internal Server Error: Missing JWT Secret' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.status(200).json({
      message: 'Login successful',
      id: existingUser._id,
      token
    });
  } catch (error) {
    console.error('Log-in error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Temporary store for verification codes (in a real app, store in a database)
const verificationCodes = {};

// Forgot password route - Send verification code
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code (in a real app, store in the database with expiry time)
    verificationCodes[email] = verificationCode;

    // Send email with the verification code
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Verification Code',
      text: `Your password reset verification code is: ${verificationCode}`,
    });

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify Code Route
router.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  try {
    // Check if the provided code matches the stored code
    if (verificationCodes[email] === code) {
      // Optionally clear the code after successful verification
      delete verificationCodes[email];

      // Automatically log in the user by generating a JWT token
      const user = User.findOne({ email });
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2d' });

      res.status(200).json({
        message: 'Code verified successfully. You are now logged in.',
        token,
      });
    } else {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Update Password Route
router.put('/update-password', async (req, res) => {
  const { username, email, oldPassword, newPassword } = req.body;

  try {
    // Validate fields
    if (!username || !email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by username and email
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
