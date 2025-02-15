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
        const { pageUser } = args;
        return {
          url: `/users?page=${pageUser}`,
          method: "GET",
        };
      },
      provideTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "USERS" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "USERS" }];
      },
    }),
    getUser: builder.query({
      query: (args) => {
        const { id } = args;
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (args) => {
        const { id } = args;
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    userDelete: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useBalanceQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUserDeleteMutation,
  useSendMoneyMutation,
  useUserEditMutation,
  useUserRegisterMutation,
} = userApiSlice;
