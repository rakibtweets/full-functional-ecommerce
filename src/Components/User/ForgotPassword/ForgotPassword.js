import React, { Fragment, useEffect, useState } from 'react';
import '../Login.css';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearErrors,
  forgotPassword,
} from '../../../Redux/Actions/userActions';
import MetaData from '../../Layout/MetaData/MetaData';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  };
  return (
    <Fragment>
      <MetaData title={`Forgot Password`} />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleFormSubmit} className="shadow-lg">
              <h1 className="mb-3">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;