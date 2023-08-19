
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
  },
  imagePath: {
    type:String ,
 },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    min: 10,
  },
  DOB:{
    type: String,
    trim: true,
  },
  gender: {
    type: String,
  },
  profession:{
    type: String,
  },
  bio:{
    type: String,
    trim: true,
  },
  password:{
  type: String,
  min: 6,
},
unavailableDates: [Date],
salt: String,
});

workerSchema.path('email').validate(async(email)=>{
 const emailcount=await mongoose.models.Worker.countDocuments({email})
return !emailcount;
},'email already exists')

// Hash and set the password before saving the user
workerSchema.pre('save', async function (next) {
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

module.exports = mongoose.model('Worker', workerSchema);
