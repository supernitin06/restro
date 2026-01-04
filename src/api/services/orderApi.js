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
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery } = orderApi;
