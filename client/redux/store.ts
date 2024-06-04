"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apis/api-slice";
import authSlice from "./features/slices/auth-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
