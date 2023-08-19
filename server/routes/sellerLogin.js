// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Seller = require('../models/seller');
const Token =require( "../models/token.js");
const generateAccessToken=require('../helpers/generateAccessToken')

// seller login
router.post('/sellerlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (seller && await bcrypt.compare(password, seller.password)) {
      const accessToken = generateAccessToken(email);
      const token = new Token({
        token: accessToken,
      });
      await token.save();
      res.send({accessToken,success:true});
      console.log('seller Login successful');

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
