const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const connectDB = require('./db');
const keys = require('./config/keys');

const app = express();

connectDB();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/orders', require('./routes/orders'));

app.listen(keys.port, () => console.log(`Server started on port ${keys.port}`));
