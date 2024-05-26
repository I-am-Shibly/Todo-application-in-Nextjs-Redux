import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';
import localStorageMiddleware from './localStorageMiddleware';
import { thunk } from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, localStorageMiddleware))
);

export default store;
