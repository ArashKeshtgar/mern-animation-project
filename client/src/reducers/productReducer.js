import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_SUCCESS,
  PRODUCTS_LOADING,
  GET_MY_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  myProducts: [],
  loading: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case GET_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case GET_MY_PRODUCTS_SUCCESS:
      return { ...state, myProducts: action.payload, loading: false };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, myProducts: state.myProducts.filter(p => p._id !== action.payload) };
    default:
      return state;
  }
}
