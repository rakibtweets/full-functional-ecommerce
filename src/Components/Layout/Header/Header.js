import React, { Fragment } from 'react';
import './Header.css';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row py-3">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <h6 className="text-white fw-bold">React Shop</h6>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

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
