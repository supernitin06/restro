import { baseApi } from "./baseApi";

export const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 GET MENU LIST
        getMenus: builder.query({
            query: () => ({
                url: "admin/item?restaurantId=69576acfd4e05e92cee77736",
                method: "GET",
            }),
            providesTags: ["Menu"],
        }),

        // 🔹 ADD MENU
        addMenu: builder.mutation({
            query: (payload) => ({
                url: "admin/menu",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Menu"],
        }),

        // 🔹 UPDATE MENU
        updateMenu: builder.mutation({
            query: ({ id, payload }) => ({
                url: `admin/menu/${id}`,
                method: "PUT",
                data: payload,
            }),
            invalidatesTags: ["Menu"],
        }),

        // 🔹 DELETE MENU
        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `admin/menu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Menu"],
        }),
    }),
});

export const {
    useGetMenusQuery,
    useAddMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
} = menuApi;