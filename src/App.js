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
