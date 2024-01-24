import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TodoType from "../../types/TodoType";

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
   tagTypes: ["Todos"],
   endpoints: (builder) => ({
      getTodos: builder.query<TodoType[], void>({
         query: () => "/todos",
         transformResponse: (res: TodoType[]) => res.sort((a, b) => b.id - a.id),
         providesTags: ["Todos"],
      }),
      addTodo: builder.mutation<TodoType, TodoType>({
         query: (todo) => ({
            url: "/todos",
            method: "POST",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      updateTodo: builder.mutation<TodoType, TodoType>({
         query: (todo) => ({
            url: `/todos/${todo.id}`,
            method: "PATCH",
            body: todo,
         }),
         invalidatesTags: ["Todos"],
      }),
      deleteTodo: builder.mutation<TodoType, Partial<TodoType>>({
         query: ({id}) => ({
            url: `/todos/${id}`,
            method: "DELETE",
            body: id,
         }),
         invalidatesTags: ["Todos"],
      }),
   }),
});

export const {
   useGetTodosQuery, 
   useAddTodoMutation, 
   useUpdateTodoMutation, 
   useDeleteTodoMutation
} = apiSlice;
