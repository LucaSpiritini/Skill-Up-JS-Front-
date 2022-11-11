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
      invalidateTags: [{ type: "transaction", id: "transaction" }],
    }),
    getTransactions: builder.query({
      query: (args) => {
        const { categoryId, description, currency, page } = args;

        return {
          url: `/transactions?page=${page}`,
          method: "GET",
          params: { categoryId, description, currency },
        };
      },
      provideTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "transaction", id: "transaction" },
            ...result.ids.map((id) => ({ type: "transaction", id })),
          ];
        } else return [{ type: "transaction", id: "transaction" }];
      },
    }),
    editTransaction: builder.mutation({
      query: (data) => ({
        url: `/transaction/${data.id}`,
        method: "PUT",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "transaction", id: arg.id },
      ],
    }),
    deleteTransaction: builder.mutation({
      query: ({ id }) => ({
        url: "/transaction",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "transaction", id: arg.id },
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
