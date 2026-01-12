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
        url: `delivery-partners/order/${orderId}/assign`, 
        method: "POST",
        body: { deliveryPartnerId: partnerId },  
      }),
      invalidatesTags: ["Order"], // optional
    }),

  updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/orders/${id}/admin-status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order"],
    }),

     updateKitchenStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `admin/orders/${orderId}/kitchen-status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order"],
    }),

  

  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useAssignDeliveryMutation, useUpdateOrderStatusMutation, useUpdateKitchenStatusMutation } = orderApi;
