import React, { Fragment } from 'react';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../../Search/Search';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row py-3">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <h5 className="text-white fw-bold">
              <Link className="text-white fw-bold text-decoration-none" to="/">
                React Shop
              </Link>
            </h5>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login">
            <button className="btn" id="login_btn">
              Login
            </button>
          </Link>

          <span id="cart" className="ms-3">
            <FaShoppingCart size="1.7em" />
          </span>
          <span className="ms-1 rounded p-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
