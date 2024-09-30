// controllers/userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { createUser, findUserByEmail, updateUserOtp } = require('../models/user');
const { sendOtpEmail } = require('../utils/email');  // Import the email utility

const signup = async (req, res) => {
  const { name, age, email, password } = req.body;

  // Check if user exists
  findUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (result.length) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    createUser({ name, age, email, password: hashedPassword, otp }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating user' });

      // Send OTP via email
      sendOtpEmail(email, otp);  // Call the function from utils/email.js
      res.status(201).json({ message: 'Signup successful, OTP sent to email' });
    });
  });
};

// Other functions like login, verifyOtp stay the same



const login = async (req, res) => {
  console.log("test");
  
  const { email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (!result.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token });
  });
};

const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (!result.length || result[0].otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    updateUserOtp(email, null, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error verifying OTP' });

      res.json({ message: 'OTP verified, account activated' });
    });
  });
};



module.exports = { signup, login, verifyOtp };
