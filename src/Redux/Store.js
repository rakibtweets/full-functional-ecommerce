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
import { cartReducers } from './Reducers/cartReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productsDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassswordReducer,
  cart: cartReducers,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
