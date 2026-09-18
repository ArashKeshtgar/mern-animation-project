import { GET_REVIEWS_SUCCESS, ADD_REVIEW_SUCCESS } from '../actions/types';

const initialState = {
  reviews: [],
  loading: true
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload, loading: false };
    case ADD_REVIEW_SUCCESS:
      return { ...state, reviews: [action.payload, ...state.reviews] };
    default:
      return state;
  }
}
