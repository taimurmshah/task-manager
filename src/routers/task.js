const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET /tasks?completed=true||false
// pagination: limit & skip
// GET /tasks?limit=10&skip=0
//limit = number of items
//skip = sets of limit#s to 'skip' over.
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  //this logic works even if query is false bc it's a string, not a boolean value.
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    const user = req.user;
    await user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip)
        }
      })
      .execPopulate();
    res.send(user.tasks);
    // const tasks = await Task.find({ owner: req.user._id });
    // res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  let updates = Object.keys(req.body);
  let possibleUpdates = { description: true, completed: true };
  for (let i = 0; i < updates.length; i++) {
    if (!possibleUpdates[updates[i]]) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    let _id = req.params.id;

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();

    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //let task = await Task.findByIdAndDelete(id);

    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
