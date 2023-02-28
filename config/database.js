const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI)
    // .connect("mongodb+srv://Tamoor:moontmk@cluster0.swfy1tk.mongodb.net/Todos?retryWrites=true&w=majority")

    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDatabase;
