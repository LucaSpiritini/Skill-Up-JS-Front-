import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
