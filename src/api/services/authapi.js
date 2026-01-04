import { baseApi } from "../services/baseApi";
import { setCredentials } from "../services/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 LOGIN
    login: builder.mutation({
      query: (payload) => ({
        url: "admin/login",
        method: "POST",
        data: payload,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // ✅ login response ko auth cache me daal diya
          dispatch(
            authApi.util.updateQueryData(
              "getAuthData",
              undefined,
              () => data
            )
          );

          // Set credentials in state
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch (err) {}
      },
    }),

    // 🔹 AUTH DATA HOLDER (CACHE ONLY)
    getAuthData: builder.query({
      queryFn: () => ({ data: null }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAuthDataQuery,
} = authApi;
