import React from 'react';
import { Link } from 'react-router-dom';

interface ILoginModal {
  active: boolean;
  setActive: any;
}

export const LoginModal: React.FC<ILoginModal> = ({ active, setActive }) => {
  return active ? (
    <div className="v-popup-overlay" onClick={() => setActive(false)}>
      <div className="v-popup-window" onClick={(e) => e.stopPropagation()}>
        <div className="v-popup-window__content">
          <div
            className="v-popup-window__close v-popup-window__close--inside"
            onClick={() => setActive(false)}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 60.963 60.842"
              fill="#000"
              width="16px"
              height="16px"
            >
              <path
                d="M59.595,52.861L37.094,30.359L59.473,7.98c1.825-1.826,1.825-4.786,0-6.611
	c-1.826-1.825-4.785-1.825-6.611,0L30.483,23.748L8.105,1.369c-1.826-1.825-4.785-1.825-6.611,0c-1.826,1.826-1.826,4.786,0,6.611
	l22.378,22.379L1.369,52.861c-1.826,1.826-1.826,4.785,0,6.611c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
	l22.502-22.502l22.501,22.502c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
	C61.42,57.647,61.42,54.687,59.595,52.861z"
              />
            </svg>
          </div>
          <div className="auth">
            <div className="v-form">
              <div className="v-form__title">Регистрация</div>
              <div className="v-form__content">
                <div className="auth-social">
                  <Link
                    data-layout-mobile="icon,label"
                    data-layout-desktop="icon,label"
                    className="v-button v-button--default v-button--size-default auth-social__button auth-social__button--email auth-social__button--with-label btn-outlined"
                    data-social="email"
                    to="/register"
                  >
                    <div className="v-button__icon v-button__icon--new">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 100 100"
                      >
                        <path
                          d="M93,19H7c-1.1,0-2,0.9-2,2v58c0,0,0,0,0,0.1c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1,0.1,0.2c0,0.1,0,0.1,0.1,0.2
	c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0,0,0,0,0,0.1c0,0,0,0,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1
	c0,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1s0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0
	c0,0,0.1,0,0.1,0h86c0.2,0,0.3,0,0.4,0c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0.1-0.1,0.1-0.1c0.1,0,0.2-0.1,0.2-0.2
	c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0.1-0.1,0.2-0.2l0.1-0.1c0,0,0,0,0-0.1c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.2
	c0-0.1,0-0.1,0.1-0.2s0-0.1,0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0,0,0,0,0-0.1V21C95,19.9,94.1,19,93,19z M9,32.1l27,21.4
	L9,74.9V32.1z M12.8,77l26.5-21l9.5,7.5c0.4,0.3,0.8,0.4,1.2,0.4s0.9-0.1,1.2-0.4l9.5-7.5l26.5,21H12.8z M91,74.9L64,53.5l27-21.4
	V74.9z M91,27l-1.2,1L50,59.5L10.2,28L9,27v-4h82V27z"
                        />
                      </svg>
                    </div>
                    <span className="v-button__label">Почта</span>
                  </Link>
                </div>
              </div>
              <div className="v-form__footer">
                <span>
                  <span className="auth-social__hint-text">
                    <span>Есть аккаунт?</span>
                  </span>
                  <Link to="/login" className="t-link-inline">
                    <span>Войти</span>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
