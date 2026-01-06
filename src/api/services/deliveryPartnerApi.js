import { baseApi } from "./baseApi";

export const deliveryPartnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryPartners: builder.query({
      query: () => ({
        url: "admin/delivery-partners",
        method: "GET",
      }),
      providesTags: ["DeliveryPartner"],
    }),
    createDeliveryPartner: builder.mutation({
      query: (payload) => ({
        url: "admin/delivery-partners/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["DeliveryPartner"],
    }),
    getdeliveryPartnerOrders: builder.query({
      query: (id) => ({
        url: `admin/delivery-partners/${id}/orders`,
        method: "GET",
      }),
      providesTags: ["DeliveryPartner"],
    }),
     
    updateDeliveryPartner: builder.mutation({
      query: (id) => ({
        url: `admin/delivery-partners/${id}/toggle-status`,
        method: "PUT",
      }),
      invalidatesTags: ["DeliveryPartner"],
    }),


  }),
  overrideExisting: false,
});

export const {
  useGetDeliveryPartnersQuery,
  useCreateDeliveryPartnerMutation,
  useGetdeliveryPartnerOrdersQuery,
  useUpdateDeliveryPartnerMutation
} = deliveryPartnerApi;