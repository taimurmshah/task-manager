const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const PORT = process.env.PORT || 5000;

//automatically parses incoming JSON
app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update parameters." });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) return res.status(404).send();

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  let updates = Object.keys(req.body);
  let possibleUpdates = { description: true, completed: true };
  for (let i = 0; i < updates.length; i++) {
    if (!possibleUpdates[updates[i]]) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    let task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
