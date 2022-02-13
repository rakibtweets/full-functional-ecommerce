import React, { Fragment } from 'react';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../../Search/Search';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../Redux/Actions/userActions';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success('Logout successfully.');
  };
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
          <Link to="/cart" className=" text-decoration-none">
            <span id="cart" className="ms-3">
              <FaShoppingCart size="1.7em" />
            </span>
            <span className="ms-1 rounded p-1" id="cart_count">
              2
            </span>
          </Link>
          {user ? (
            <div className="ms-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login">
                <button className="btn" id="login_btn">
                  Login
                </button>
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
