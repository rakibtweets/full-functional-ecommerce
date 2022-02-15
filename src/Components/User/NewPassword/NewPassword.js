import React, { Fragment, useEffect, useState } from 'react';
import '../Login.css';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearErrors, resetPassword } from '../../../Redux/Actions/userActions';
import MetaData from '../../Layout/MetaData/MetaData';
import { useNavigate, useParams } from 'react-router-dom';

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password updated Successfully');
      navigate('/login');
    }
  }, [dispatch, alert, error, success, navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, formData));
  };
  return (
    <Fragment>
      <MetaData title={`New password Reset`} />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleFormSubmit} className="shadow-lg">
              <h1 className="mb-3">New Password</h1>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;