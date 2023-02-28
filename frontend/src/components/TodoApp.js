import UseTodoApp from "../customHook/UseTodoApp";

const TodoApp = () => {
  const {
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
    updateTodo,
    isUpdating,
    setIsUpdate,
    setTodoInput,
    isCreating,
    addTodoHandler,
    onEditHandler,
    deleteTodoHandler,
    updateTodoHandler,
    completeTodoHandler,
  } = UseTodoApp();
  return (
    <>
      <div className="TodoList">
        <h1>
          Todo List! <span>A simple MERN todo list</span>
        </h1>
        <form className="NewTodoForm">
          {/* <label htmlFor="task">New Todo</label> */}
          <input
            type="text"
            placeholder="New Todo"
            value={todoInput}
            id="task"
            onChange={(e) => setTodoInput(e.target.value)}
          />
          {isUpdate ? (
            <button onClick={onEditHandler} disabled={isUpdating}>
              Edit Todo
            </button>
          ) : (
            <button onClick={addTodoHandler} disabled={isCreating}>
              Add Todo
            </button>
          )}
        </form>

        {todos?.map((todo, index) => (
          <div key={index} className="Todo">
            <li
              key={todo.id}
              className={`Todo-task ${
                todo.status === "completed" ? "completed" : ""
              }`}
            >
              {todo.title}
            </li>
            <div className="Todo-buttons">
              <button
                onClick={() => {
                  completeTodoHandler(todo);
                }}
                disabled={todo.status === "completed" ? true : false}
              >
                <i className="bi bi-check2-all"></i>
              </button>
              <button
                onClick={() => {
                  updateTodoHandler(todo);
                }}
                disabled={todo.status === "completed" ? true : false}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                onClick={() => {
                  deleteTodoHandler(todo);
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoApp;
