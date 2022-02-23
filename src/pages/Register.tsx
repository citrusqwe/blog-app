import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userApi } from '../api';
import { USER_LOAD_ERROR, USER_SIGNIN } from '../redux/reducers/userReducer';

import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name should be at least 3 characters')
    .max(20, 'First name should be less than 12 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name should be at least 3 characters')
    .max(20, 'Last name should be less than 12 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email address is invalid'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username should be at least 3 characters')
    .max(12, 'Username should be less than 12 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters'),
});

interface IFormState {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((user: RootStateOrAny) => user?.user);
  const [cookies, setCookie, removeCookie] = useCookies(['blogauth']);
  let navigate = useNavigate();

  const registerNewUser = async ({
    email,
    password,
    firstName,
    lastName,
    username,
  }: any) => {
    try {
      const data = await userApi.register({
        firstName,
        lastName,
        username,
        password,
        avatar: `https://avatars.dicebear.com/api/croodles/${Math.random()}.svg`,
        email,
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
      <form className="register form" onSubmit={handleSubmit(registerNewUser)}>
        <p className="register__login">
          Already have an account?
          <Link className="router-link" to="/login">
            Log in
          </Link>
        </p>
        <h2 className="title">Register</h2>

        <div className="form__body">
          <div className="form__input">
            <input
              type="text"
              className="input-hover"
              placeholder="Firts name"
              id="firstName"
              {...register('firstName')}
            />
            <span className="focus-border"></span>
          </div>
          {errors.firstName && (
            <p className="error">{errors?.firstName?.message}</p>
          )}
          <div className="form__input">
            <input
              type="text"
              className="input-hover"
              placeholder="Last name"
              id="lastName"
              {...register('lastName')}
            />
            <span className="focus-border"></span>
          </div>
          {errors.lastName && (
            <p className="error">{errors?.lastName?.message}</p>
          )}
          <div className="form__input">
            <input
              // type="email"
              className="input-hover"
              placeholder="Email"
              id="email"
              {...register('email')}
            />
            <span className="focus-border"></span>
          </div>
          {errors.email && <p className="error">{errors?.email?.message}</p>}
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="form__input">
            <input
              type="text"
              className="input-hover"
              placeholder="User name"
              id="username"
              {...register('username')}
            />
            <span className="focus-border"></span>
          </div>
          {errors.username && (
            <p className="error">{errors?.username?.message}</p>
          )}
          <div className="form__input">
            <input
              type="password"
              className="input-hover"
              placeholder="Password"
              id="password"
              {...register('password')}
            />
            <span className="focus-border"></span>
          </div>
          {errors.password && (
            <p className="error">{errors?.password?.message}</p>
          )}
        </div>
        <button className="btn-hover btn-reset signup-btn" type="submit">
          Sign Up
        </button>
        <div className="angle"></div>
      </form>
      <div className="background"></div>
    </div>
  );
};

export default Register;
