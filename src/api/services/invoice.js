import { baseApi } from "./baseApi";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Generate new invoice
    generateInvoice: builder.mutation({
      query: (orderId) => ({
        url: `admin/invoices/generate/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["Order", "Invoice"],
    }),

    // Get all invoices
    getInvoices: builder.query({
      query: () => ({
        url: "admin/invoices",
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),

    // Get single invoice details
    getInvoice: builder.query({
      query: (invoiceId) => ({
        url: `admin/invoices/${invoiceId}`,
        method: "GET",
      }),
      providesTags: ["Invoice"],
    }),

    // Delete invoice
    deleteInvoice: builder.mutation({
      query: (invoiceId) => ({
        url: `admin/invoices/${invoiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGenerateInvoiceMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoiceApi;
