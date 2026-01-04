import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import authReducer from "../auth/authtoken";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),

  devTools: import.meta.env.MODE !== "production",
});
