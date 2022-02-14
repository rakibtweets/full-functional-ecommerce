import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsDetailsReducer,
  productsReducer,
} from './Reducers/productReducers';
import {
  authReducer,
  forgotPassswordReducer,
  userReducer,
} from './Reducers/userReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productsDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
