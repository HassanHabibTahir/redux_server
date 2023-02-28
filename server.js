const dotenv = require("dotenv");
const app = require("./app.js");

const connectDatabase = require("./config/database.js");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });


