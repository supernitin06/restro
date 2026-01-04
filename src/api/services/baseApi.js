import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosInstance } from "../../utils/axiosInstance";
import { logout } from "../services/authSlice";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }, api) => {
    try {
      const state = api.getState();
      const token = state.auth?.authToken;

      console.log("TOKEN SENT:", token); // 👈 DEBUG

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return { data: result.data };
    } catch (error) {
      if (error.response?.status === 401) {
        api.dispatch(logout());
      }

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data,
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
