
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  imagePath: {
    type:String ,
     required:true
 },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: 10,
  },
  DOB:{
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  bname:{
    type: String,
    required: true,
  },
  bio:{
    type: String,
    required: true,
    trim: true,
  },
  password:{
  type: String,
  required: true,
  min: 6,
},
salt: String,
});

// Hash and set the password before saving the user
sellerSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.salt = salt;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Seller', sellerSchema);
