import React, { Fragment, useEffect, useState } from 'react';
import '../Login.css';
import './UpdatePassword.css';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearErrors,
  updatePassword,
} from '../../../Redux/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../../Redux/Constants/userConstants';
import MetaData from '../../Layout/MetaData/MetaData';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password updated Successfully');
      navigate('/me');
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', password);
    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={`Change Password`} />

      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleFormSubmit} className="shadow-lg">
              <h1 className="mt-2 mb-5">Update Password</h1>
              <div className="form-group">
                <label htmlFor="old_password_field">Old Password</label>
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new_password_field">New Password</label>
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading ? true : false}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
