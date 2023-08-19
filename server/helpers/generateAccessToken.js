const express = require('express');


require('dotenv').config();
const jwt= require("jsonwebtoken");

const generateAccessToken = (email) => {
  const token = jwt.sign({ email }, "WedEase");
  console.log("Generated Token:", token); // Logging the generated token
  return token;
};
//const generateAccessToken=(email)=>jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
module.exports =generateAccessToken;
