import express, { Request, Response } from 'express';
import Order from '../models/Order';
import auth from '../middleware/auth';

const router = express.Router();

// @route   POST /api/orders
// @desc    Persist an order after a successful Stripe payment
// @access  Private
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { items, total, stripePaymentIntentId } = req.body;

    if (!items || !items.length || !total || !stripePaymentIntentId) {
      return res.status(400).json({ msg: 'Missing order details' });
    }

    const order = await Order.create({
      user: req.user!.id,
      items,
      total,
      stripePaymentIntentId
    });

    res.json(order);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders
// @desc    List the logged-in user's orders
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user!.id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

export default router;
