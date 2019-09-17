const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
