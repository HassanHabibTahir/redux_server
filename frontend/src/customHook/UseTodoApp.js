import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  useGetAllTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../store/todoSlice";
import "../components/Styles.css";

const UseTodoApp = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [oldTodo, setOldTodo] = useState({});
  const { refetch, data, error, isLoading } = useGetAllTodosQuery();

  const [
    deleteTodo,
    { isLoading: isDeleting, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteTodoMutation();

  const [
    createTodo,
    { isLoading: isCreating, isSuccess: createSuccess, error: createError },
  ] = useCreateTodoMutation();

  const [
    updateTodo,
    { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError },
  ] = useUpdateTodoMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
  }, [data]);
  // useEffect(() => {
  //   if (deleteSuccess) {
  //     toast.success('Todo deleted successfully');
  //   }
  //   if (updateSuccess) {
  //     toast.success('Todo update successfully');
  //   }
  //   if (createSuccess) {
  //     toast.success('Todo Add successfully');
  //   }
  // }, [deleteSuccess,updateSuccess,createSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!todoInput) {
        toast.error("Please Enter todo");
      } else {

      
    let newTodo = {
      title: todoInput,
      status: "Queue",
    };
    setTodos([newTodo, ...todos]);
    setTodoInput("");
    createTodo(newTodo);
    toast.success("Todo Add successfully");
}
  };
  const deleteTodoHandler = (todoID) => {
    let filterTodo = todos.filter((todo) => {
      if (todo._id != todoID._id) {
        return todo;
      }
    });

    setTodos(filterTodo);
    deleteTodo(todoID._id);
    toast.success("Todo deleted successfully");
  };

  const updateTodoHandler = (todo) => {
    setTodoInput(todo.title);
    setIsUpdate(true);
    setOldTodo(todo);
  };
  const onEditHandler = (e) => {
    e.preventDefault();

    let updatedItem = {
      id: oldTodo._id,
      title: todoInput,
      status: oldTodo.status,
    };

    let updatedTodos = todos.map((todo) => {
      if (oldTodo._id == todo._id) {
        return updatedItem;
      } else {
        return todo;
      }
    });

    updateTodo(updatedItem);
    setTodos(updatedTodos);

    setTodoInput("");
    setIsUpdate(false);
    toast.success("Todo update successfully");
  };

  const completeTodoHandler = (selectedTodo) => {
    let updatedItem = {
      id: selectedTodo._id,
      title: selectedTodo.title,
      status: "completed",
    };

    let updatedTodos = todos.map((todo) => {
      if (selectedTodo._id == todo._id) {
        return updatedItem;
      } else {
        return todo;
      }
    });

    updateTodo(updatedItem);
    setTodos(updatedTodos);
  };

  return {
    todos,
    data,
    error,
    oldTodo,
    refetch,
    setTodos,
    isUpdate,
    todoInput,
    isLoading,
    setOldTodo,
    deleteTodo,
    createTodo,
    isUpdating,
    addTodoHandler,
    updateTodo,
    updateTodo,
    setIsUpdate,
    isCreating,
    setTodoInput,
    onEditHandler,
    deleteTodoHandler,
    updateTodoHandler,
    completeTodoHandler,
  };
};

export default UseTodoApp;
