import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowDown } from '../assets/img/arrow-down.svg';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { USER_SIGNOUT } from '../redux/reducers/userReducer';
import useComponentVisible from '../hooks/useComponentVisible';
import { useCookies } from 'react-cookie';

const ProfileModal: React.FC = () => {
  const [profilePopupHandler, setProfilePopupHandler] =
    useState<boolean>(false);
  const { user } = useSelector((user: RootStateOrAny) => user?.user);
  const dispatch = useDispatch();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [cookies, setCookie, removeCookie] = useCookies(['blogauth']);

  const signOut = () => {
    dispatch(USER_SIGNOUT());
    removeCookie('blogauth', { path: '/' });
  };

  return (
    <>
      <div
        className="nav__profile header-profile"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        ref={ref}
      >
        <p className="header-profile__name">{user?.username}</p>
        <img
          className="header-profile__img"
          src={user?.avatar}
          alt={user?.username}
        />
        <ArrowDown className="header-profile__icon" />
        {isComponentVisible && (
          <div className="header-profile__bottom">
            <ul className="header-profile__links links-list">
              <li className="links-list__item">
                <Link className="links-list__link" to="/profile">
                  Profile settings
                </Link>
              </li>
              {/* <li className="links-list__item">
                <Link className="links-list__link" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="links-list__item">
                <Link className="links-list__link" to="/create-post">
                  Create post
                </Link>
              </li> */}
              <li className="links-list__item">
                <button
                  className="links-list__link btn-reset"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileModal;
