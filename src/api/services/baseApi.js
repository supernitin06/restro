import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { logout } from "../auth/authtoken";


const axiosInstance = axios.create({
  baseURL: "https://sog.bitmaxtest.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});


const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }, api) => {
    try {
      const token = localStorage.getItem("token");

      const result = await axiosInstance({
        url,
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
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth", "User", "Order", "Menu", "Category", "Dashboard"],
  endpoints: () => ({}),
});

