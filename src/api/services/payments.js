import { baseApi } from "./baseApi";


const paymentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentsstats: builder.query({
            query: () => ({ url: `admin/dashboard/payment-stats`,
                 method: "get" }),
            providesTags: ["Payments"],
        }),
        getRecentPayments: builder.query({
            query: () => ({ url: `admin/dashboard/transactions/recent`,
                 method: "get" }),
            providesTags: ["Payments"],
        }),

        getTransactionStats: builder.query({
            query: () => ({ url: `admin/dashboard/transaction-stats`,
                 method: "get" }),
            providesTags: ["Payments"],
        }),

        getRefundPayments: builder.query({
            query: () => ({ url: `admin/dashboard/refunds`,
                 method: "get" }),
            providesTags: ["Payments"],
        }),

        SearchPayments: builder.query({
            query: (search) => ({
                url: `admin/dashboard/payments?search=${search}`,
                method: "get" }),
            providesTags: ["Payments"],
        }),
    })
})

export const { useGetRecentPaymentsQuery, useGetPaymentsstatsQuery, useGetTransactionStatsQuery, useGetRefundPaymentsQuery, useSearchPaymentsQuery } = paymentsApi;