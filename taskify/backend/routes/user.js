// Require dotenv at the top of your main server file
require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require('../config/mailer');
const verificationCodes = {};


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

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex'); // 6-digit code
    verificationCodes[email] = verificationCode;

    // Send email
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code',
      text: `Your verification code is ${verificationCode}`,
      html: `<p>Your verification code is <strong>${verificationCode}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Verify Code Route
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === code) {
    res.status(200).json({ message: 'Code verified', token: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' }) });
  } else {
    res.status(400).json({ message: 'Invalid verification code' });
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
