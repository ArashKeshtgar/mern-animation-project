const express = require('express');
const keys = require('../config/keys');
const auth = require('../middleware/auth');

const router = express.Router();
const stripe = require('stripe')(keys.stripeSecretKey);

// @route   POST /api/payment/create-payment-intent
// @desc    Create a Stripe PaymentIntent for the given cart total
// @access  Private
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body; // amount in the smallest currency unit (e.g. cents)

    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Payment intent creation failed', error: err.message });
  }
});

module.exports = router;
