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
              { type: "User", id: "USER" },
              ...result.ids.map((id) => ({ type: "User", id })),
            ];
          } else return [{ type: "User", id: "USER" }];
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
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),

      invalidateTags: [{ type: "transaction", id: "TRANSACTION" }],

    }),
  }),
});


export const {
  useBalanceQuery,
  useSendMoneyMutation,
  useUserEditMutation,
  useUserRegisterMutation,
} = userApiSlice;

