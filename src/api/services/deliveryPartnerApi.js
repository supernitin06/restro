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
  }),
  overrideExisting: false,
});

export const { useGetDeliveryPartnersQuery } = deliveryPartnerApi;