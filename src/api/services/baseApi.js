import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { logout } from "../services/authSlice";

/* ---------------- AXIOS INSTANCE ---------------- */
const axiosInstance = axios.create({
  baseURL: "https://resto-grandma.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------- AXIOS BASE QUERY ---------------- */
const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }, api) => {
    try {
      const state = api.getState();
      const token = state?.auth?.authToken;

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
    } catch (error) {
      const err = error;

      // 🔐 Auto logout on unauthorized
      if (err?.response?.status === 401) {
        api.dispatch(logout());
      }

      return {
        error: {
          status: err?.response?.status,
          data: err?.response?.data || err.message,
        },
      };
    }
  };

/* ---------------- RTK QUERY BASE API ---------------- */
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth", "User", "Order", "Menu", "Category", "Dashboard"],
  endpoints: () => ({}),
});
