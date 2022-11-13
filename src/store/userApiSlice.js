import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

// const userAdapter = createEntityAdapter({});

// const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    balance: builder.query({
      query: (args) => ({
        url: `/transactions/balance/user`,
        method: "GET",
        providesTags: (result, error, arg) => {
          if (result?.ids) {
            return [
              { type: "Transaction", id: "TRANSACTIONS" },
              ...result.ids.map((id) => ({ type: "Transaction", id })),
            ];
          } else return [{ type: "Transaction", id: "TRANSACTIONS" }];
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
      invalidateTags: [{ type: "transaction", id: "TRANSACTION" }],
    }),
    getAllUser: builder.query({
      query: (args) => {
        const {pageUser} = args
        return {
          url: `/users?page=${pageUser}`,
          method: "GET",
        }
      }
    })
  }),
});

export const {
  useBalanceQuery,
  useGetAllUserQuery,
  useSendMoneyMutation,
  useUserEditMutation,
  useUserRegisterMutation,
} = userApiSlice;
