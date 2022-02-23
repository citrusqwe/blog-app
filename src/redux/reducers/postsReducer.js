import { createSlice } from '@reduxjs/toolkit';
export const postsSlice = createSlice({
  name: 'postsReducer',
  initialState: {
    posts: [],
    allPosts: [],
    currentPost: {},
    categories: [],
    category: 'all',
    sort: 'DESC',
    isLoaded: false,
    isLoading: true,
    postsCount: 0,
    errorMsg: '',
    pages: 1,
    currentPage: 1,
  },
  reducers: {
    SET_POSTS: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoaded: true,
        pages: Math.round(action.payload.length / 6) + 1,
      };
    },
    SET_ALL_POSTS: (state, action) => {
      return {
        ...state,
        allPosts: action.payload,
        isLoaded: true,
        // pages: Math.round(action.payload.length / 6) + 1,
      };
    },
    SET_POSTS_COUNT: (state, action) => {
      return {
        ...state,
        postsCount: action.payload,
      };
    },
    SET_CATEGORY: (state, action) => {
      return {
        ...state,
        category: action.payload,
      };
    },
    SET_LOADING: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    SET_SORT: (state, action) => {
      return {
        ...state,
        sort: action.payload,
      };
    },
    SET_CURRENT_PAGE: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    POSTS_ERROR: (state, action) => {
      return {
        ...state,
        isLoaded: false,
        errorMsg: action.payload,
      };
    },
    SET_CURRENT_POST: (state, action) => {
      return {
        ...state,
        currentPost: { ...action.payload },
      };
    },
    SET_CATEGORIES: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
  },
});

export const {
  SET_POSTS,
  SET_CURRENT_POST,
  POSTS_ERROR,
  SET_CURRENT_PAGE,
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_ALL_POSTS,
  SET_SORT,
  SET_LOADING,
  SET_POSTS_COUNT,
} = postsSlice.actions;
export default postsSlice.reducer;
