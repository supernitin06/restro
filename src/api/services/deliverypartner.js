import { baseApi } from "../../api/services/baseApi";
 

const deliveryPartnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getDeliveryPartners: builder.query({
      query: () => ({ url: "admin/delivery-partners", method: "get" }),
      providesTags: ["DeliveryPartner"],
    }),

    getDeliveryPartner: builder.query({
      query: (id) => ({ url: `admin/delivery-partners/${id}`, method: "get" }),
      providesTags: ["DeliveryPartner"],
    }),
  }),
});

export const { useGetDeliveryPartnersQuery, useGetDeliveryPartnerQuery } = deliveryPartnerApi;
