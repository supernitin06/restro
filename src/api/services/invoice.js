import { baseApi } from "./baseApi";

export const invoiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInvoice: builder.query({
            query: () => ({
                url: `admin/invoices`,
                method: "GET",
            }),
            providesTags: ["Invoice"],
        }),

        deleteInvoice: builder.mutation({
            query: (orderId) => ({
                url: `admin/invoices/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Invoice"],
        }),

        getInvoiceById: builder.query({
            query: (orderId) => `admin/invoices/${orderId}`,
            providesTags: ["Invoice"],
        }),
    }),
});

export const { useGetInvoiceQuery, useDeleteInvoiceMutation, useGetInvoiceByIdQuery } = invoiceApi;