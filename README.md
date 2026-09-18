# MERN Store

A full-stack e-commerce demo built with MongoDB, Express, React, and Node — with a `framer-motion`-animated frontend and a real Stripe test-mode checkout.

## Features

- Product catalog with categories, product detail pages, and reviews
- JWT-based authentication (register/login)
- Client-side cart persisted to `localStorage`
- Checkout via Stripe (test/sandbox mode) using Stripe Elements
- Order history for logged-in users
- Animated UI (page transitions, hover effects, cart badge) built with `framer-motion`

## Tech stack

- **Frontend:** React, React Router, Redux, Bootstrap, Framer Motion, Stripe.js
- **Backend:** Node.js, Express, MongoDB/Mongoose, JWT, bcrypt, Multer
- **Payments:** Stripe (test mode)

## Setup

### 1. Install dependencies

```bash
npm install
cd client && npm install && cd ..
```

### 2. Configure environment variables

Copy the placeholders in `.env` (backend, project root) and `client/.env` (frontend) and fill in real values:

- `MONGO_URI` — your MongoDB connection string (defaults to a local instance)
- `JWT_SECRET` — any long random string
- `STRIPE_SECRET_KEY` — from your [Stripe test-mode dashboard](https://dashboard.stripe.com/test/apikeys)
- `client/.env`: `REACT_APP_STRIPE_PUBLISHABLE_KEY` — the matching publishable test key

### 3. Seed sample product data

```bash
npm run seed
```

Inserts 4 categories and 15 sample products (with placeholder images) into MongoDB.

### 4. Run

```bash
# terminal 1 — backend (port 5000)
npm run dev

# terminal 2 — frontend (port 3000)
cd client && npm start
```

### 5. Try the checkout flow

Register/log in, add a few products to the cart, and pay with the Stripe test card:

```
4242 4242 4242 4242 — any future expiry date — any CVC
```

## Project structure

```
├── models/          Mongoose schemas (User, Product, Category, Review, Order)
├── routes/          Express routes (auth, products, categories, reviews, payment, orders)
├── middleware/       JWT auth middleware
├── seed/            Sample data seeding script
├── client/          React frontend (Redux, Stripe Elements, framer-motion)
```
