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

   OrderKitchenStatus: builder.mutation({
     query: (params = {}, partnerId) => ({
       url: `orders/${params.id}/kitchen-status`,
       method: "PATCH",
       params,
       partnerId,
     }),
     invalidatesTags: ["Order"],
   }),

   OrderStatusUpdate: builder.mutation({
     query: (params = {}, status) => ({
       url: `/admin/orders/${params.id}/admin-status`,
       method: "PATCH",
       params,
       status,
     }),
     invalidatesTags: ["Order"],
   }),

  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useOrderKitchenStatusMutation, useOrderStatusUpdateMutation } = orderApi;
