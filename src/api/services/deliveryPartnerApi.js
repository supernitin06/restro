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
    updateDeliveryPartner: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `admin/delivery-partners/${id}`,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["DeliveryPartner"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDeliveryPartnersQuery,
  useCreateDeliveryPartnerMutation,
  useUpdateDeliveryPartnerMutation,
} = deliveryPartnerApi;