// src/api/services/menuApi.js
import { baseApi } from "./baseApi";

export const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ================= MENU =================
        getMenus: builder.query({
            query: ({ restaurantId, categoryId, search, status }) => ({
                url: "admin/item",
                method: "GET",
                params: {
                    restaurantId,
                    categoryId,
                    search: search || undefined,
                    status: status !== "all" ? status : undefined,
                },
            }),
            providesTags: ["Menu"],
        }),

        addMenu: builder.mutation({
            query: (payload) => ({
                url: "admin/item",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Menu"],
        }),

        updateMenu: builder.mutation({
            query: ({ id, payload }) => ({
                url: `admin/menu/${id}`,
                method: "PUT",
                data: payload,
            }),
            invalidatesTags: ["Menu"],
        }),

        deleteMenu: builder.mutation({
            query: (id) => ({
                url: `admin/menu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Menu"],
        }),

        // ================= CATEGORY (FINAL FIX) =================
        getCategories: builder.query({
            query: (restaurantId) => ({
                url: "admin/cat",
                method: "GET",
                params: { restaurantId },
            }),
            providesTags: ["Categories"],
        }),

        addCategory: builder.mutation({
            query: (payload) => ({
                url: "admin/cat",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Categories"],
        }),

        updateCategory: builder.mutation({
            query: ({ id, payload }) => ({
                url: `admin/cat/${id}`,
                method: "PUT",
                data: payload,
            }),
            invalidatesTags: ["Categories"],
        }),

        toggleCategory: builder.mutation({
            query: (id) => ({
                url: `admin/cat/${id}`,
                method: "PUT",
                data: { isActive: false },
            }),
            invalidatesTags: ["Categories"],
        }),




    }),
});

export const {
    useGetMenusQuery,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useToggleCategoryMutation,
    useAddMenuMutation,
} = menuApi;