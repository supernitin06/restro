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

    addMenu: builder.mutation({
      query: (formData) => ({
        url: "admin/menu",
        method: "POST",
        data: formData,
        params: {
          restaurantId: formData.get("restaurantId"),
        },
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

    updateMenuStockStatus: builder.mutation({
      query: ({ id, inStock }) => ({
        url: `admin/menu/${id}/inStock`,
        method: "PUT",
        data: { inStock },
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

    // ================= CATEGORY =================
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

    // ENABLE / DISABLE CATEGORY (TOGGLE)
  // ENABLE / DISABLE CATEGORY (TOGGLE)
toggleCategoryStatus: builder.mutation({
  query: ({ categoryId }) => ({
    url: `admin/cat/${categoryId}/toggle`, // Correct endpoint
    method: "PATCH",
  }),
  invalidatesTags: ["Categories"],
}),


    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `admin/cat/${id}`,
        method: "DELETE",
        data: { isActive: false },
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});

export const {
  useGetMenusQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useUpdateMenuStockStatusMutation,
  useDeleteMenuMutation,

  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryStatusMutation,
  useDeleteCategoryMutation,
} = menuApi;
