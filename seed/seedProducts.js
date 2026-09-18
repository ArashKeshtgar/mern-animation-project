const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../db');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

const categoryNames = ['Electronics', 'Apparel', 'Home & Kitchen', 'Books'];

// Real, relevant photos from Unsplash's CDN (no API key needed for direct
// image delivery), one hand-picked per product — not a random/generic feed.
const img = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`;

const products = [
  { title: 'Wireless Noise-Cancelling Headphones', description: 'Over-ear Bluetooth headphones with 30-hour battery life and active noise cancellation.', price: 129.99, category: 'Electronics', stock: 50, image: img('1505740420928-5e560c06d30e') },
  { title: 'Smart Fitness Watch', description: 'Tracks heart rate, sleep, and workouts with a 7-day battery.', price: 89.5, category: 'Electronics', stock: 40, image: img('1508685096489-7aacd43bd3b1') },
  { title: 'Portable Bluetooth Speaker', description: 'Waterproof speaker with 360-degree sound and 12-hour playtime.', price: 45.0, category: 'Electronics', stock: 60, image: img('1608043152269-423dbba4e7e1') },
  { title: '4K Action Camera', description: 'Compact action camera with image stabilization and a waterproof case.', price: 159.99, category: 'Electronics', stock: 25, image: img('1484506399805-c273b8e91dce') },
  { title: 'Mechanical Gaming Keyboard', description: 'RGB backlit mechanical keyboard with hot-swappable switches.', price: 79.99, category: 'Electronics', stock: 45, image: img('1538481199705-c710c4e965fc') },
  { title: 'Wireless Gaming Mouse', description: 'Lightweight wireless mouse with a 20,000 DPI optical sensor.', price: 49.99, category: 'Electronics', stock: 55, image: img('1605773527852-c546a8584ea3') },
  { title: '27" 4K Monitor', description: 'Ultra HD IPS monitor with HDR support, ideal for work and gaming.', price: 329.99, category: 'Electronics', stock: 20, image: img('1527443224154-c4a3942d3acf') },
  { title: 'USB-C Fast Charger 65W', description: 'Compact GaN charger that fast-charges laptops, tablets, and phones.', price: 24.99, category: 'Electronics', stock: 100, image: img('1557767382-97b28f5488e7') },
  { title: 'True Wireless Earbuds', description: 'In-ear earbuds with active noise cancellation and a charging case.', price: 59.99, category: 'Electronics', stock: 70, image: img('1572569511254-d8f925fe2cbb') },
  { title: 'Smart Home Security Camera', description: '1080p Wi-Fi camera with night vision and motion alerts.', price: 69.99, category: 'Electronics', stock: 35, image: img('1618482914248-29272d021005') },
  { title: 'Portable Power Bank 20000mAh', description: 'High-capacity power bank with fast charging for phones and tablets.', price: 34.99, category: 'Electronics', stock: 80, image: img('1585995603413-eb35b5f4a50b') },
  { title: 'Classic Cotton T-Shirt', description: 'Soft, breathable 100% cotton t-shirt available in multiple colors.', price: 19.99, category: 'Apparel', stock: 200, image: img('1576417677416-6ca3adfb5435') },
  { title: 'Running Sneakers', description: 'Lightweight running shoes with a breathable mesh upper.', price: 74.99, category: 'Apparel', stock: 90, image: img('1542291026-7eec264c27ff') },
  { title: 'Stainless Steel French Press', description: '34oz French press for rich, full-flavored coffee.', price: 29.99, category: 'Home & Kitchen', stock: 55, image: img('1639906512494-dd4a536abc4e') },
  { title: 'Atomic Habits', description: 'A practical guide to building good habits and breaking bad ones.', price: 16.99, category: 'Books', stock: 100, image: img('1517849325426-6eac321919a0') }
];

const run = async () => {
  await connectDB();

  await Category.deleteMany({});
  await Product.deleteMany({});
  await User.deleteOne({ email: 'demo-seller@voltra.store' });

  const seller = await User.create({
    name: 'Voltra Store',
    email: 'demo-seller@voltra.store',
    password: await bcrypt.hash('seed-account-not-for-login', 10)
  });

  const categoryDocs = {};
  for (const name of categoryNames) {
    categoryDocs[name] = await Category.create({ name });
  }

  for (const p of products) {
    await Product.create({
      title: p.title,
      description: p.description,
      price: p.price,
      category: categoryDocs[p.category]._id,
      imageUrl: p.image,
      stock: p.stock,
      seller: seller._id
    });
  }

  console.log(`Seeded ${categoryNames.length} categories and ${products.length} products (${products.filter(p => p.category === 'Electronics').length} electronics).`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
