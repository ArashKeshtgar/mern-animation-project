const express = require('express');
const path = require('path');
const multer = require('multer');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter).populate('category', 'name').sort('-createdAt');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/products/mine
// @desc    List the logged-in user's own listings
// @access  Private
router.get('/mine', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
      .populate('category', 'name')
      .sort('-createdAt');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/products
// @desc    List a new product for sale
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category, stock, imageUrl: bodyImageUrl } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : bodyImageUrl;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      imageUrl,
      seller: req.user.id
    });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/products/:id
// @desc    Remove one of your own listings
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to remove this listing' });
    }
    await product.deleteOne();
    res.json({ msg: 'Listing removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
