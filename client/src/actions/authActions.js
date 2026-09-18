import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, navigate) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', userData);
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token).user));
    if (navigate) navigate('/products');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : { msg: 'Registration failed' }
    });
  }
};

// Login - get user token
export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token).user));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : { msg: 'Login failed' }
    });
  }
};

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
