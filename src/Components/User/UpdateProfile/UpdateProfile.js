import React, { Fragment, useEffect, useState } from 'react';
import '../Login.css';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearErrors,
  loadUser,
  updateUserProfile,
} from '../../../Redux/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../../Redux/Constants/userConstants';
import MetaData from '../../Layout/MetaData/MetaData';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User Updated Successfully');
      dispatch(loadUser());
      navigate('/me');
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, navigate, user, isUpdated]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);

    dispatch(updateUserProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();
    // loading file upload
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    // read file
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={`Update Profile`} />
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <h1 className="mt-1 mb-5">Update Profile</h1>

              <div className="form-group">
                <label for="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3 w-100"
                disabled={loading ? true : false}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
