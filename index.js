const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(process.env.PORT, async () => {
  console.log("Server started");
  try {
    await connection;
    console.log("Mongo DB connected");
  } catch (err) {
    console.log({ error: err.message });
  }
});
