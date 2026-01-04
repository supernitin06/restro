export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page = 1, limit = 6, search } = {}) => ({
        url: "admin/orders",
        method: "GET",
        params: {
          page,
          limit,
          search,
        },
      }),
      providesTags: ["Order"],
    }),
  }),
});
export const { useGetOrdersQuery } = orderApi;