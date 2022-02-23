import { createSlice } from '@reduxjs/toolkit';

export const pagesSlice = createSlice({
  name: 'pagesSlice',
  initialState: {
    page: {},
  },
  reducers: {
    SET_PAGE: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    RESET_PAGE: (state) => {
      return {
        ...state,
        page: {},
      };
    },
  },
});

export const { SET_PAGE, RESET_PAGE } = pagesSlice.actions;
export default pagesSlice.reducer;
