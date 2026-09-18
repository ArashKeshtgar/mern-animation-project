module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mern-store',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  port: process.env.PORT || 5000
};
