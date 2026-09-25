import mongoose from 'mongoose';
import keys from './config/keys';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(keys.mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
