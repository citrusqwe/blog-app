import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ProfileSettings } from '../components/profile/ProfileSettings';

const Profile: React.FC = () => {
  // console.log(window.location.pathname);

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  return (
    <>
      <Header />
      <div className="container">
        {/* <div className="profile-handler">
          <ul className="profile-handler__list">
            <Link
              className="profile-handler__link"
              to={`${window.location.pathname}/posts`}
            >
              Posts
            </Link>
            <Link
              className="profile-handler__link"
              to={`${window.location.pathname}/settings`}
            >
              Settings
            </Link>
            <Link
              className="profile-handler__link"
              to={`${window.location.pathname}/admin`}
            >
              Admin
            </Link>
          </ul>
        </div> */}
        <ProfileSettings />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
