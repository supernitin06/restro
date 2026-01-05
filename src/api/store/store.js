import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import authReducer from "../services/authSlice";
import { orderApi } from "../services/orderApi";
import { menuApi } from "../services/menuApi";
import { restaurantApi } from "../services/restaurantApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [restaurantApi.reducerPath]: restaurantApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(baseApi.middleware, orderApi.middleware, menuApi.middleware, restaurantApi.middleware),

    devTools: import.meta.env.MODE !== "production",
});