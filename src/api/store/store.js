import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import authReducer from "../services/authSlice";
import { orderApi } from "../services/orderApi";
import { userApi } from "../services/userapi";
import { restaurantApi } from "../services/resturentsapi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, orderApi.middleware, userApi.middleware, restaurantApi.middleware),

  devTools: import.meta.env.MODE !== "production",
});
