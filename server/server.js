const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./task.model");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/tasks", { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

const taskRoutes = express.Router();

app.use("/tasks", taskRoutes);

taskRoutes.route("/").get((req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Tasks found in DB");
      res.status(200).json(tasks);
    }
  });
});

taskRoutes.route("/add").post(function(req, res) {
  const task = new Task(req.body);
  task
    .save()
    .then(task => {
      console.log(`Task "${task.title}" added successfully`);
      res.status(200).json(`Task "${task.title}" added successfully`);
    })
    .catch(err => {
      console.log(`Adding new task "${task.title}" failed`);
      res.status(400).send(`Adding new task "${task.title}" failed`);
    });
});

taskRoutes.route("/remove").post(function(req, res) {
  const condition = req.body;
  Task.deleteMany(condition)
    .then(removeResponse => {
      console.log(`${removeResponse.deletedCount} tasks removed`);
      res.status(200).json(`${removeResponse.deletedCount} tasks removed`);
    })
    .catch(err => {
      console.log("Removing tasks failed");
      res.status(400).send("Removing tasks failed");
    });
});

taskRoutes.route("/remove/:id").post(function(req, res) {
  Task.deleteOne({ _id: req.params.id })
    .then(_ => {
      console.log("Task was successfully removed");
      res.status(200).json("Task was successfully removed");
    })
    .catch(err => {
      console.log("Removing tasks failed");
      res.status(400).send("Removing task failed");
    });
});

taskRoutes.route("/update/:id").post(function(req, res) {
  Task.updateOne({ _id: req.params.id }, req.body)
    .then(_ => {
      console.log("Task updated");
      res.status(200).json("Task updated");
    })
    .catch(err => {
      console.log("Update of task failed");
      res.status(400).send("Update of task failed");
    });
});
