
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  imagePaths: {
    type:[String] ,
     required:true
 },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  
  description:{
    type: String,
    required: true,
    trim:true
  },
  Category:{
    type: String,
    required: true,
    trim:true
  }
});

module.exports = mongoose.model('Product', productSchema);
