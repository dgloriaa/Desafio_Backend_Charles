const express = require("express");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (request, response) => {
  response.json({
    message: "API Connect BEK",
  });
});

module.exports = app;