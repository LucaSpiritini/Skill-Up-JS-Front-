import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      const decoded = jwtDecode(token);

      state.token = token;
      state.user = decoded;
    },
    logout: (state, action) => {
      localStorage.removeItem("jwt");
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
