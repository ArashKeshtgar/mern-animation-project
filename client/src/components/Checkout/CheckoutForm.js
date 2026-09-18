import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { createPaymentIntent, placeOrder } from '../../actions/orderActions';
import { clearCart } from '../../actions/cartActions';

const SHIPPING_COST = 4.99;

const stripePromise = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  : null;

const SuccessScreen = () => (
  <motion.div
    className="text-center py-5"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <motion.div
      style={{ fontSize: '4rem' }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
    >
      ✅
    </motion.div>
    <h2 className="mt-3">Payment Successful!</h2>
    <p className="text-muted">Redirecting you to your orders...</p>
  </motion.div>
);

const PayForm = ({ items, total, clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError('');

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    try {
      await dispatch(placeOrder({
        items: items.map(i => ({ product: i.productId, title: i.title, price: i.price, quantity: i.quantity })),
        total,
        stripePaymentIntentId: paymentIntent.id
      }));
      dispatch(clearCart());
      onSuccess();
    } catch (err) {
      setError('Payment succeeded but saving the order failed. Please contact support.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      {error && <p className="text-danger mt-3">{error}</p>}
      <motion.button
        type="submit"
        className="btn btn-success btn-lg mt-4 w-100"
        whileTap={{ scale: 0.97 }}
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </motion.button>
      <p className="text-muted small mt-2">
        Test card: 4242 4242 4242 4242, any future date, any CVC.
      </p>
    </form>
  );
};

const CheckoutForm = () => {
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const total = items.length ? subtotal + SHIPPING_COST : 0;
  const [clientSecret, setClientSecret] = useState('');
  const [intentError, setIntentError] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    if (total > 0) {
      createPaymentIntent(Math.round(total * 100))
        .then(setClientSecret)
        .catch(() => setIntentError(
          'Could not start checkout. Make sure STRIPE_SECRET_KEY is set to a valid test key in the backend .env file.'
        ));
    }
  }, [total]);

  const onSuccess = () => {
    setSucceeded(true);
    setTimeout(() => navigate('/orders'), 2200);
  };

  if (succeeded) {
    return <div className="container py-4" style={{ maxWidth: 480 }}><SuccessScreen /></div>;
  }

  if (!items.length) {
    return <div className="container py-4"><p>Your cart is empty.</p></div>;
  }

  if (!stripePromise) {
    return (
      <div className="container py-4">
        <p className="text-danger">
          Stripe is not configured. Set REACT_APP_STRIPE_PUBLISHABLE_KEY in client/.env.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h1 className="mb-4">Checkout</h1>
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between text-muted">
            <span>Shipping</span>
            <span>${SHIPPING_COST.toFixed(2)}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
      {intentError && <p className="text-danger">{intentError}</p>}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PayForm items={items} total={total} clientSecret={clientSecret} onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutForm;
