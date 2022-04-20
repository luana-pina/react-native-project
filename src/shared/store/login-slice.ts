import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    token: undefined,
  },
  reducers: {
    isLoginHandler(state) {
      if (state.token) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    setToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
    clearToken(state) {
      state.token = undefined;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
