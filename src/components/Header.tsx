import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileModal from './ProfileModal';

const Header: React.FC = () => {
  const { isLoged } = useSelector((user: RootStateOrAny) => user.user);

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav nav">
          <Link to="/">Logo</Link>
          <ul className="nav__list nav-list">
            {isLoged ? (
              <ProfileModal />
            ) : (
              <li className="nav-list__item">
                <Link to="/login">Login/Register</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
