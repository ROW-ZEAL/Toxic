// userSlice.js
import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    email: "",
    name: "",
    status: null // can be 'admin' or 'user'
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    unsetUserInfo(state) {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
