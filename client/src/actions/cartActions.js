import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QTY, CLEAR_CART } from './types';

export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartQty = (productId, quantity) => ({
  type: UPDATE_CART_QTY,
  payload: { productId, quantity }
});

export const clearCart = () => ({ type: CLEAR_CART });
