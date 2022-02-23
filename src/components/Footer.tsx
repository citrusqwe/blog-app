import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link to="/" className="footer__logo logo">
          LOGO
        </Link>
        <p className="footer__descr">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu velit
          tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce
          a nunc eget ligula suscipit finibus.
        </p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Twitter
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/" className="footer__link">
              VK
            </Link>
          </li>
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Instagram
            </Link>
          </li>
        </ul>
        <div className="footer__copy">
          © 2002–2021 qwe Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
