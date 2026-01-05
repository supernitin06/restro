import { baseApi } from "./baseApi";

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 🔹 GET RESTAURANTS LIST
        getRestaurants: builder.query({
            query: () => ({
                url: "admin/restaurants",
                method: "GET",
            }),
            providesTags: ["Restaurant"],
        }),

        // 🔹 CREATE RESTAURANT
        createRestaurant: builder.mutation({
            query: (payload) => ({
                url: "admin/restaurants",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Restaurant"],
        }),

        // 🔹 GET SINGLE RESTAURANT
        getRestaurant: builder.query({
            query: (id) => ({
                url: `admin/restaurants/${id}`,
                method: "GET",
            }),
            providesTags: ["Restaurant"],
        }),

        // 🔹 DELETE RESTAURANT
        deleteRestaurant: builder.mutation({
            query: (id) => ({
                url: `admin/restaurants/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Restaurant"],
        }),
    }),
});

export const {
    useGetRestaurantsQuery,
    useCreateRestaurantMutation,
    useGetRestaurantQuery,
    useDeleteRestaurantMutation,
} = restaurantApi;