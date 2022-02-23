import { createSlice } from '@reduxjs/toolkit';
// import { USER_SIGNIN, USER_LOAD_ERROR } from "../constants";

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    currentUser: {},
    errorMsg: '',
    isLoged: false,
  },
  reducers: {
    USER_SIGNIN: (state, action) => {
      return {
        ...state,
        ...action.payload,
        errorMsg: '',
        isLoged: true,
      };
    },
    USER_SIGNOUT: (state) => {
      return {
        currentUser: {},
        errorMsg: '',
        isLoged: false,
      };
    },
    USER_LOAD_ERROR: (state, action) => {
      return {
        ...state,
        errorMsg: action.payload,
        isLoged: false,
      };
    },
  },
});

export const { USER_SIGNIN, USER_LOAD_ERROR, USER_SIGNOUT } = userSlice.actions;
export default userSlice.reducer;
