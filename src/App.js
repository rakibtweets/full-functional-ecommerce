import './App.css';
import Header from './Components/Layout/Header/Header';
import Home from './Pages/Home/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/User/Login';
import Register from './Components/User/Register/Register';
import { useEffect, useState } from 'react';
import { loadUser } from './Redux/Actions/userActions';
import store from './Redux/Store';
import UserProfile from './Components/User/UserProfile/UserProfile';
import PrivateRoute from './Components/Routes/PrivateRoute/PrivateRoute';
import UpdateProfile from './Components/User/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword/ForgotPassword';
import NewPassword from './Components/User/NewPassword/NewPassword';
import Cart from './Components/Cart/Cart/Cart';
import Shipping from './Components/Cart/Shipping/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './Components/Cart/Payment/Payment';

// stripe Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './Components/Cart/OrderSuccess/OrderSuccess';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  //load currently logged in user
  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get(`/api/v1/paymentapi`);
      console.log('~ data', data.stripeApiKey);
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
          <Route
            path="/shipping"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <Shipping />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <ConfirmOrder />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              </>
            }
          />
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Header />
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  </Elements>
                </>
              }
            />
          )}
          {/*  <Route
            path="/payment"
            element={
              <>
                <Header />
                <Payment />
              </>
            }
          /> */}

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/me"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/me/update"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/password/update"
            element={
              <>
                <Header />
                <PrivateRoute>
                  <UpdatePassword />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/password/forgot"
            element={
              <>
                <Header />
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/password/reset/:token"
            element={
              <>
                <Header />
                <NewPassword />
              </>
            }
          />

          <Route
            path="/search/:keyword"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductDetails />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
