import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QTY, CLEAR_CART } from '../actions/types';

const loadCart = () => {
  try {
    const raw = localStorage.getItem('cartItems');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCart()
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existing = state.items.find(i => i.productId === product._id);
      let items;
      if (existing) {
        items = state.items.map(i =>
          i.productId === product._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        items = [
          ...state.items,
          {
            productId: product._id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity
          }
        ];
      }
      return { ...state, items };
    }
    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter(i => i.productId !== action.payload) };
    case UPDATE_CART_QTY:
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload.productId
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        )
      };
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
}
