import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import keys from '../config/keys';
import auth from '../middleware/auth';

const router = express.Router();
const stripe = new Stripe(keys.stripeSecretKey);

// @route   POST /api/payment/create-payment-intent
// @desc    Create a Stripe PaymentIntent for the given cart total
// @access  Private
router.post('/create-payment-intent', auth, async (req: Request, res: Response) => {
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
    console.error((err as Error).message);
    res.status(500).json({ msg: 'Payment intent creation failed', error: (err as Error).message });
  }
});

export default router;
