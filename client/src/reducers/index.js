import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import reviewReducer from './reviewReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  reviews: reviewReducer,
  cart: cartReducer,
  orders: orderReducer,
  errors: errorReducer
});
