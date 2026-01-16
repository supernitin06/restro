import { baseApi } from "./baseApi";

export const ratingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ================= RATING =================
        getRatings: builder.query({
            query: (restaurantId) => ({
                url: "rating",
                method: "GET",
                params: { restaurantId },
            }),
            providesTags: ["Rating"],
        }),
    }),
});

export const { useGetRatingsQuery } = ratingApi;