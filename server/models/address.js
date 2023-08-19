const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
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
      pincode: {
        type: String,
        required: true,
        trim: true,
        min: 6,
      },
      streetAddress: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
     
  });

  const Address = mongoose.model('Address', addressSchema);

module.exports = Address;