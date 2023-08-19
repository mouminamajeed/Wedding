const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NYmPkSCfYsS3Tchht4Iy8CkgaTc7DpuNi1kwjEsX1ieFBvfEmeEXQiZy5fTz1k3xmorqmckZ40JPcVh0M6UY4iN00lnBEIuSd');
const Payment = require('../models/payment');

router.post('/payment', async (req, res) => {
  console.log('hi');
  const { amount, currency, cardholderName } = req.body;

  try {
    const amountInCents = Math.floor(amount * 100); // Convert amount to cents

    if (amountInCents < 100) { // Minimum amount check
      throw new Error('Amount must be at least 1 cent.');
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      payment_method_types: ['card'],
     
    });

    // Save payment details to the database
    const payment = new Payment({ amount: amountInCents, currency, name: cardholderName });
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating PaymentIntent:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;

