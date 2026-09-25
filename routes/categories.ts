import express, { Request, Response } from 'express';
import Category from '../models/Category';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET /api/categories
// @access  Public
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/categories
// @access  Private
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }
    category = await Category.create({ name });
    res.json(category);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
});

export default router;
