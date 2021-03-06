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
import { newOrderReducer } from './Reducers/orderReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productsDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPassswordReducer,
  cart: cartReducers,
  newOrder: newOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
