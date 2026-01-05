import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import authReducer from "../services/authSlice";
import { orderApi } from "../services/orderApi";
import { menuApi } from "../services/menuApi";
import { userApi } from "../services/userapi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, orderApi.middleware, userApi.middleware , menuApi.middleware),



 

    devTools: import.meta.env.MODE !== "production",
});