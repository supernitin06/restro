// src/api/services/orderApi.js
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params = {}) => ({
        url: "admin/orders",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),

    // ✅ Add this mutation
    assignDelivery: builder.mutation({
      query: ({ orderId, partnerId }) => ({
        url: `orders/${orderId}/assign-delivery`, // ✅ path matches
        method: "POST",
        body: { deliveryPartnerId: partnerId },  // ✅ body key must match backend
      }),
      invalidatesTags: ["Order"], // optional
    }),

    OrderStatusUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/orders/${id}/admin-status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useAssignDeliveryMutation, useOrderStatusUpdateMutation } = orderApi;
