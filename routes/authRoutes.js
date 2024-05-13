// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// User login
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(500).json({ message: 'Server error.' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    });
  })(req, res);
});

// User logout
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;