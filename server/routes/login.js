// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token =require( "../models/token.js");
const generateAccessToken=require('../helpers/generateAccessToken')
// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(email)

    if (user && await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true});
      console.log('Login successful');
      
    } else {
      res.send({success: false});
      console.log('Invalid email or password');
     
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
