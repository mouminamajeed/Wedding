const express = require('express');
const router = express.Router();
const Address = require('../models/address');

// Route to handle saving address details to MongoDB
router.post('/address', (req, res) => {
  const addressData = req.body;

  const newAddress = new Address(addressData);

  newAddress
    .save()
    .then((addressData) => {
      res.status(201).json(addressData);
    })
    .catch((err) => {
      console.error('Error saving address:', err);
      res.status(500).json({ error: 'Failed to save address' });
    });
});

module.exports = router;