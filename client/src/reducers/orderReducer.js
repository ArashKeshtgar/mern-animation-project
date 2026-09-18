import { GET_ORDERS_SUCCESS, ADD_ORDER_SUCCESS } from '../actions/types';

const initialState = {
  orders: [],
  loading: true
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, loading: false };
    case ADD_ORDER_SUCCESS:
      return { ...state, orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
}
