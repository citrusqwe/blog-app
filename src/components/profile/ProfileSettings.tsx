import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

export const ProfileSettings = () => {
  const { user } = useSelector((user: RootStateOrAny) => user?.user);

  return (
    <div className="profile">
      <div className="container">
        <h2>Account Settings</h2>
        <div className="profile-info">
          <img
            className="profile__avatar"
            src={user?.avatar}
            alt={user?.username}
          />
          {/* <div className="admin-badge">
            <span>admin</span>
          </div> */}
          <div className="input">
            <label htmlFor="firstName">First name:</label>
            <input
              className="input-hover"
              type="text"
              id="firstName"
              defaultValue={user?.firstName}
            />
            <span className="focus-border"></span>
          </div>
          <div className="input">
            <label htmlFor="firstName">Last name:</label>
            <input
              className="input-hover"
              type="text"
              id="firstName"
              defaultValue={user?.lastName}
            />
            <span className="focus-border"></span>
          </div>
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input
              className="input-hover"
              type="text"
              id="username"
              defaultValue={user?.username}
            />
            <span className="focus-border"></span>
          </div>
          <div className="profile__item">
            <span>Email</span>
            <p>
              {user?.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')}
            </p>
            <button className="btn-hover btn-reset">Change</button>
          </div>
          <div className="profile__item">
            <span>Password</span>
            <button className="btn-hover btn-reset">Change</button>
          </div>
          {/* <div className="input">
            <label htmlFor="firstName">Password:</label>
            <input className="input-hover" type="text" id="firstName" />
            <span className="focus-border"></span>
          </div>
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input className="input-hover" disabled type="text" id="email" />
          </div> */}
          <button className="btn-hover btn-reset profile__save">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
