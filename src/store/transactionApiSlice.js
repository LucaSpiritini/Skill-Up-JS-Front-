import { createEntityAdapter } from "@reduxjs/toolkit/dist";
import { apiSlice } from "./apiSlice";

const transactionAdapter = createEntityAdapter({});

const initialState = transactionAdapter.getInitialState();

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (initialData) => {
        return {
          url: "/transactions",
          method: "POST",
          body: {
            ...initialData,
          },
        };
      },
      invalidateTags: [{ type: "Transaction", id: "TRANSACTIONS" }],
    }),
    getTransactions: builder.query({
      query: (args) => {
        const { categoryId, description, currency, page } = args;
        console.log(page);

        return {
          url: `/transactions?page=${page}`,
          method: "GET",
          params: { categoryId, description, currency },
        };
      },
      provideTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Transaction", id: "TRANSACTIONS" },
            ...result.ids.map((id) => ({ type: "Transaction", id })),
          ];
        } else return [{ type: "Transaction", id: "TRANSACTIONS" }];
      },
    }),
    editTransaction: builder.mutation({
      query: (data) => {
        return {
          url: `/transactions/${data.id}`,
          method: "PUT",
          body: {
            ...data,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Transaction", id: arg.id },
      ],
    }),
    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: "/transactions",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Transaction", id: arg.id },
      ],
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetTransactionsQuery,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApiSlice;
