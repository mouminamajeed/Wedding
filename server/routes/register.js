// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
