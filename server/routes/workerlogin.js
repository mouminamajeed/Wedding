// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Worker = require('../models/worker');
const Token =require( "../models/token.js");
const generateAccessToken=require('../helpers/generateAccessToken')

// worker login
router.post('/workerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });

    if (worker && await bcrypt.compare(password, worker.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true});
      console.log('worker Login successful');
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
