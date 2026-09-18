import axios from 'axios';
import { GET_REVIEWS_SUCCESS, ADD_REVIEW_SUCCESS, GET_ERRORS } from './types';

export const getReviews = (productId) => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${productId}`);
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response ? err.response.data : {} });
  }
};

export const addReview = (reviewData) => async dispatch => {
  try {
    const res = await axios.post('/api/reviews', reviewData);
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response ? err.response.data : {} });
  }
};
