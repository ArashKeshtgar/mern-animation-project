import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

store.subscribe(() => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
  } catch {
    // ignore storage failures (e.g. private browsing)
  }
});

export default store;
