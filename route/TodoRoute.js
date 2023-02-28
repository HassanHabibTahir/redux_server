const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
} = require("../controller/TodoController.js");

//all todo
router.route("/todos").get(getAllTodos);

//new todo / create todo      ok
router.route("/todo/new").post(createTodo);

//update /edit todo  okk
router.route("/todo/:id").put(updateTodo);

//delete todo    ok
router.route("/todo/:id").delete(deleteTodo);

module.exports = router;
