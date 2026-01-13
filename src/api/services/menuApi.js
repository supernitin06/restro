// src/api/services/menuApi.js
import { baseApi } from "./baseApi";

export const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ================= MENU =================
        getMenus: builder.query({
            query: ({ restaurantId, categoryId, search, status }) => ({
                url: "admin/menu",
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

        updateMenuStockStatus: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `admin/menu/${id}/inStock`,
                method: "PUT",
                data: payload,
            }),
            invalidatesTags: ["Menu"],
        }),

        addMenu: builder.mutation({
            query: ({ restaurantId, ...data }) => ({
                url: "admin/menu",
                method: "POST",
                data: { restaurantId, ...data },
                params: { restaurantId },
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
            query: (data) => ({
                url: `admin/cat`,
                method: "POST",
                data,
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
    useUpdateMenuStockStatusMutation,
} = menuApi;