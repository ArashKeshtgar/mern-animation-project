import './env';

import path from 'path';
import express from 'express';
import connectDB from './db';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import reviewRoutes from './routes/reviews';
import paymentRoutes from './routes/payment';
import orderRoutes from './routes/orders';

const app = express();

connectDB();

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

export default app;
