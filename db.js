const mongoose = require('mongoose');
const keys = require('./config/keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
