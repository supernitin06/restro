// src/api/services/userApi.js
import { baseApi } from "../../api/services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 20 }) => ({
        url: `admin/users?page=${page}&limit=${limit}`,
        method: "get",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({ url: `admin/users/${id}`, method: "get" }),
    }),
    getUserOrders: builder.query({
      query: (id) => ({ url: `admin/users/${id}/orders`, method: "get" }),
    }),
    blockUser: builder.mutation({
      query: ({ id, block }) => ({
        url: `admin/users/${id}`,
        method: "PATCH",
        data: { isBlocked: block },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `admin/users/${id}`,
        method: "PATCH",
        data: body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserOrdersQuery,
  useUpdateUserMutation,
} = userApi;
