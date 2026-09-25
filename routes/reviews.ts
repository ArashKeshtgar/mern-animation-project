import express, { Request, Response } from 'express';
import Review from '../models/Review';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET /api/reviews/:productId
// @access  Public
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/reviews
// @access  Private
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { productId, score, comment } = req.body;
    let review = await Review.create({
      product: productId,
      user: req.user!.id,
      score,
      comment
    });
    review = await review.populate('user', 'name');
    res.json(review);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

export default router;
