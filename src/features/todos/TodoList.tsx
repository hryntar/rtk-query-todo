import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const ToDoList = () => {
   const [newTodo, setNewTodo] = useState("");

   const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();

   const [addTodo] = useAddTodoMutation();
   const [updateTodo] = useUpdateTodoMutation();
   const [deleteTodo] = useDeleteTodoMutation();

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      addTodo({ userId: 1, id: Number(nanoid()), title: newTodo, completed: false });
      setNewTodo("");
   };

   const newItemSection = (
      <form onSubmit={handleSubmit}>
         <label htmlFor="new-todo">Enter a new todo item</label>
         <div className="new-todo">
            <input type="text" id="new-todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter new todo" />
         </div>
         <button className="submit">
            <FontAwesomeIcon icon={faUpload} />
         </button>
      </form>
   );

   let content;
   if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = todos.map((todo) => (
         <article key={todo.id}>
            <div className="todo">
               <input
                  type="checkbox"
                  id={todo.id.toString()}
                  checked={todo.completed}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
               />
               <label htmlFor={todo.id.toString()}>{todo.title}</label>
            </div>
            <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
               <FontAwesomeIcon icon={faTrash} />
            </button>
         </article>
      ));
   } else if (isError) {
      content = (
         <p>
            Something went wrong( <br /> Please try again
         </p>
      );
      console.error(error);
   }
   return (
      <main>
         <h1>Todo List</h1>
         {newItemSection}
         {content}
      </main>
   );
};

export default ToDoList;
