import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import { Category } from './pages/Category';
import Profile from './pages/Profile';
import { AdminPage } from './pages/AdminPage';
import { useCookies } from 'react-cookie';
import { userApi } from './api';
import { useDispatch } from 'react-redux';
import { USER_SIGNIN } from './redux/reducers/userReducer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['blogauth']);

  useEffect(() => {
    loadUserByCookies();
  }, []);

  const loadUserByCookies = async () => {
    if (cookies.blogauth) {
      const data = await userApi.getCurrentUser(cookies.blogauth);
      dispatch(USER_SIGNIN({ jwt: cookies.blogauth, user: data }));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:category" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/:category/:slug" element={<Post />} />
      </Routes>
    </Router>
  );
};

export default App;
