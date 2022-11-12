import { createEntityAdapter } from "@reduxjs/toolkit/dist";
import { apiSlice } from "./apiSlice";

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (initialData) => {
        return {
          url: "/categories",
          method: "POST",
          body: {
            ...initialData,
          },
        };
      },
      invalidateTags: [{ type: "Category", id: "CATEGORY" }],
    }),
    getCategories: builder.query({
      query: (args) => ({
        url: `/categories`,
        method: "GET",
      }),
      provideTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Category", id: "CATEGORY" },
            ...result.ids.map((id) => ({ type: "Category", id })),
          ];
        } else return [{ type: "Category", id: "CATEGORY" }];
      },
    }),
    editCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: "PUT",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
