const Todo = require("../model/TodoModel.js");
const CatchAsyncError = require("../middleware/CatchAsyncError.js");
//Create Todo
exports.createTodo = CatchAsyncError(async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Todo creation failed",
      error: error.message,
    });
  }
});

//Delete Todo
exports.deleteTodo = CatchAsyncError(async (req, res, next) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Todo deletion failed",
      error: error.message,
    });
  }
});

//Update Todo
exports.updateTodo = CatchAsyncError(async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Todo update failed",
      error: error.message,
    });
  }
});

//Get All Todo
exports.getAllTodos = CatchAsyncError(async (req, res, next) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      todos,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Todo retrieval failed",
      error: error.message,
    });
  }
});
