import './App.css';
import Header from './Components/Layout/Header/Header';
import Home from './Pages/Home/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails/ProductDetails';

function App() {
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
