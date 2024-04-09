// reducers/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  user: {
    username: null,
    token: null,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(logIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const {logout } = authSlice.actions;
export default authSlice.reducer;
