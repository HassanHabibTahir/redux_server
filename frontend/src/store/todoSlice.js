import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mern-todo-rtk-lpt2.vercel.app/api/v1" }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => {
        return {
          url: `todos`,
          method: "GET",
        };
      },
    }),
    // deleteTodo
    deleteTodo: builder.mutation({
      query: (TodoId) => {
        return {
          url: `todo/${TodoId}`,
          method: "DELETE",
        };
      },
    }),

    //createTodo
    createTodo: builder.mutation({
      query: (newData) => {
        // console.log("newData", newData);
        return {
          url: `todo/new`,
          method: "POST",
          body: newData,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
      },
    }),

    //updateTodo
    updateTodo: builder.mutation({
      query: (updateData) => {
        console.log("newData", updateData);
        const { id, ...data } = updateData;
        return {
          url: `todo/${id}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
