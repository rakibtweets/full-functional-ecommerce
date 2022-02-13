import './App.css';
import Header from './Components/Layout/Header/Header';
import Home from './Pages/Home/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/User/Login';
import Register from './Components/User/Register/Register';
import { useEffect } from 'react';
import { loadUser } from './Redux/Actions/userActions';
import store from './Redux/Store';
import UserProfile from './Components/User/UserProfile/UserProfile';
import PrivateRoute from './Components/Routes/PrivateRoute/PrivateRoute';
import UpdateProfile from './Components/User/UpdateProfile/UpdateProfile';

function App() {
  //load currently logged in user
  useEffect(() => {
    store.dispatch(loadUser());
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
            path="/login"
            element={
              <>
                <Login />
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
            path="/register"
            element={
              <>
                <Register />
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
