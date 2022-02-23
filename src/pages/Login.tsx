import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../api';
import { USER_LOAD_ERROR, USER_SIGNIN } from '../redux/reducers/userReducer';

interface ISignIn {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [state, setstate] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((user: RootStateOrAny) => user?.user);
  const [cookies, setCookie, removeCookie] = useCookies(['blogauth']);
  let navigate = useNavigate();

  const signIn = async ({ email, password }: ISignIn) => {
    try {
      const data = await userApi.login({
        identifier: email,
        password: password,
      });
      dispatch(USER_SIGNIN(data));
      setCookie('blogauth', data.jwt, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });
      navigate('/');
    } catch ({ response: { data } }) {
      dispatch(USER_LOAD_ERROR(data.message[0].messages[0].message));
    }
  };

  return (
    <div className="form-wrap">
      <form className="login form" onSubmit={handleSubmit(signIn)}>
        <p className="login__register">
          Dont have an account?
          <Link className="router-link" to="/register">
            Register
          </Link>
        </p>
        <h2 className="title">Login</h2>
        <p className="error">{errorMsg}</p>
        <div className="form__body">
          <div className="form__input">
            <input
              placeholder="Email"
              type="email"
              {...register('email', { required: true })}
              className="input-hover"
            />
            <span className="focus-border"></span>
          </div>
          <div className="form__input">
            <input
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
              className="input-hover"
            />
            <span className="focus-border"></span>
          </div>
        </div>
        <Link className="login__forgot" to="/forgot-password">
          Forgot your password ?
        </Link>
        <button className="btn-hover btn-reset" type="submit">
          Sign In
        </button>
        <div className="angle"></div>
      </form>
      <div className="background"></div>
    </div>
  );
};

export default Login;
