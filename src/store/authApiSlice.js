import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (initialData) => ({
        url: '/auth/register',
        method: "POST",
        body: {
          ...initialData
        }
      })
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
