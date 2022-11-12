import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    balance: builder.query({
      query: () => ({
        url: `/transactions/balance/user`,
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
      invalidateTags: [{ type: "transaction", id: "transaction" }],
    }),
  }),
});

export const { useBalanceQuery, useSendMoneyMutation } = userApiSlice;
