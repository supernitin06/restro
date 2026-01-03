import { baseApi } from "../services/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "admin/login", 
        method: "POST",
        data: payload, // { email, password }
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
