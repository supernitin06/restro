import { baseApi } from "./baseApi";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: ({ params }) => ({
                url: `admin/dashboard/analytics?period=${params}`,
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),


        getDashboardOrders: builder.query({
            query: ({ params }) => ({
                url: `admin/dashboard/orders?period=${params}`,
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        
        getOdersale : builder.query({
            query: ({ params }) => ({
                url: `/dashboard/category-sales?period=${params}`,
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),

    })
})

export const { useGetAnalyticsQuery, useGetDashboardOrdersQuery, useGetOdersaleQuery } = dashboardApi;
