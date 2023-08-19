

const jwt= require("jsonwebtoken");
const express = require('express');

const Token = require('../models/token.js');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authentication"];
  const token = authHeader && authHeader.split(" ")[1];
  const existing = await Token.findOne({ token });
  //console.log( token);
 
  if (token === null) {
    return res.sendStatus(401);
  }
  if (!existing) {
    return res.sendStatus(403);
  }
  jwt.verify(token, "WedEase", (err, email) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = email;
    next();
  });
}
module.exports =authenticateToken;
