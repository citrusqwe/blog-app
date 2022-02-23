import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pagesReducer';
import postsReducer from './reducers/postsReducer';
import userReducer from './reducers/userReducer';

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      posts: postsReducer,
      pages: pagesReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
