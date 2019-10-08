const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const PORT = process.env.PORT || 5000;

//automatically parses incoming JSON
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5d9bd72b03d2968a499fa640");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);
  // const user = await User.findById("5d9bd71f03d2968a499fa63e");
  // await user.populate("tasks").execPopulate();
  // console.log(user.tasks);
};

main();
