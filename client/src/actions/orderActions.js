import axios from 'axios';
import { GET_ORDERS_SUCCESS, ADD_ORDER_SUCCESS, GET_ERRORS } from './types';

export const createPaymentIntent = async (amountInCents) => {
  const res = await axios.post('/api/payment/create-payment-intent', { amount: amountInCents });
  return res.data.clientSecret;
};

export const placeOrder = (orderData) => async dispatch => {
  try {
    const res = await axios.post('/api/orders', orderData);
    dispatch({ type: ADD_ORDER_SUCCESS, payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response ? err.response.data : {} });
    throw err;
  }
};

export const getOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders');
    dispatch({ type: GET_ORDERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response ? err.response.data : {} });
  }
};
