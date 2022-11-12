import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

// const userAdapter = createEntityAdapter({});

// const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    balance: builder.query({
      query: ({ id }) => ({
        url: `/transactions/balance/${id}`, // TODO Remove to receive id from url
        method: "GET",
        providesTags: (result, error, arg) => {
          if (result?.ids) {
            return [
              { type: "user", id: "user" },
              ...result.ids.map((id) => ({ type: "user", id })),
            ];
          } else return [{ type: "user", id: "user" }];
        },
      }),
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/transactions/send",
        method: "POST",
        body: { ...data },
      }),
    }),
    userEdit: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        console.log(id);
        return {
          url: `users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useBalanceQuery,
  useSendMoneyMutation,
  useUserEditMutation,
  useUserRegisterMutation,
} = userApiSlice;
