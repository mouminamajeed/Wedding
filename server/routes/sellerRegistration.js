
const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const multer = require('multer');
const path = require('path');
const authenticateToken=require('../middlewares/authenticateToken');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now() + path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage,
  limits:{fileSize:'1000000'},
  fileFilter:(req,file,cb)=>{
    const fileTypes=/jpeg|jpg|png|gif/
    const mimeType=fileTypes.test(file.mimetype)
    const extname=fileTypes.test(path.extname(file.originalname))
    if (mimeType && extname){
      return cb(null,true)
    }
    cb('give proper file format to upload')
  }
})

// Register a new user
router.post('/seller', upload.single('image'), async (req, res) => {
  try {
    console.log("hello")
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const { name, email, phoneNumber, DOB, gender,bname,address ,bio, category, password } = req.body;

    // Extract the file path from the request file object
    const imagePath = req.file.path;

    const seller = new Seller({
      name,
      email,
      phoneNumber,
      DOB,
      address,
      bname,
      gender,
      bio,
      category,
      password,
      imagePath // Store the file path in the database
    });
  await seller.save();
    console.log(seller);
    res.json(seller);
}catch(error){
  console.error('Error registering seller', error);
  res.status(500).json({ error: 'Failed to register seller' });
}
});

router.get('/sellerhome', authenticateToken ,async (req, res) => {
  try {
    const sellers = await Seller.find({ email:req.email.email }); 
    console.log(sellers);
    res.json(sellers);

  } catch (error) {
    console.error('Error fetching seller', error);
    res.status(500).json({ error: 'Failed to fetch seller' });
  }
  
});

router.post("/putseller",authenticateToken, upload.single('image'),async(req,res)=>{
  console.log(req.body)
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const { name, phoneNumber, bio } = req.body;
    const imagePath = req.file.path;

  const filter={email:req.email.email};
  const update = {
    $set: {
      name: name,
      bio: bio,
      phoneNumber: phoneNumber,
      imagePath: imagePath
    }
  };
  const changed = await Seller.updateOne(filter,update ,{
    new:true
   }
    );
    console.log(changed);
    res.send(true);
  });

module.exports = router;
