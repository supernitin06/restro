import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { logout } from "./authSlice";


const axiosInstance = axios.create({
  baseURL: "https://sog.bitmaxtest.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});


const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }, api) => {
    try {
      const state = api.getState();
      const token = state?.auth?.authToken;
 
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
 
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
 
      // 🔐 Unauthorized
      if (err.response?.status === 401) {
        api.dispatch(logout());
      }
 
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
 
/**
 * RTK Query base API
 */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  tagTypes: [
    "Auth",
    "User",
    "Order",
    "Menu",
    "Category",
    "Dashboard",
  ],
  endpoints: () => ({}),
});