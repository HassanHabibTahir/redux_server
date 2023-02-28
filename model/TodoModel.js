const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Todo Title"],
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
