import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosInstance } from "../../utils/axiosInstance";
import { logout } from "../services/authSlice";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }, api) => {
      try {
        const state = api.getState();
        const token = state?.auth?.token;

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



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth", "User", "Order", "Menu", "Category", "Dashboard"],
  endpoints: () => ({}),
});
