// src/api/services/orderApi.js
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET ORDERS
    getOrders: builder.query({
      query: (params = {}) => ({
        url: "admin/orders",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),

    // 🔹 ACCEPT / REJECT (ADMIN STATUS)
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/orders/${id}/admin-status`,
        method: "PATCH",
        data: { status }, // ACCEPTED / REJECTED
      }),
      invalidatesTags: ["Order"],
    }),

    // 🔹 KITCHEN STATUS (PREPARING / READY)
    updateKitchenStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `admin/orders/${orderId}/kitchen-status`,
        method: "PATCH",
        data: { status }, // READY
      }),
      invalidatesTags: ["Order"],
    }),

    // 🔹 ASSIGN DELIVERY PARTNER
    assignDelivery: builder.mutation({
      query: ({ orderId, partnerId }) => ({
        url: `delivery-partners/order/${orderId}/assign`,
        method: "POST",
        body: {
          deliveryPartnerId: partnerId,
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateKitchenStatusMutation,
  useAssignDeliveryMutation,
} = orderApi;
