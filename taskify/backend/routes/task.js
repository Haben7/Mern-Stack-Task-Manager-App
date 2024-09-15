const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken  = require("./auth");


router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    if (!id) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    const newTask = new Task({ title, desc });
    const savedTask = await newTask.save();

    const userUpdate = await User.findByIdAndUpdate(
      id,
      { $push: { tasks: savedTask._id } },
      { new: true, runValidators: true }
    );

    if (!userUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Task Created", task: savedTask });
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Get all Tasks
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;

    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { title, desc }, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Important Task
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);

    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndUpdate(id, { important: !taskData.important });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update Complete Task Route
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);

    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    taskData.completed = !taskData.completed;

    const updatedTask = await taskData.save();

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get Important tasks
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match:{ important: true },
      options: { sort: { createdAt: -1 } },
    });
     const ImpTaskData = Data.tasks;
    if (!Data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: ImpTaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//get complete tasks
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // User ID should be sent in the request headers
    const user = await User.findById(id).populate({
      path: "tasks",
      match: { completed: true }, // Correct field name
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const compTaskData = user.tasks;
    res.status(200).json({ data: compTaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get incompleted tasks
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // User ID should be sent in the request headers
    const user = await User.findById(id).populate({
      path: "tasks",
      match: { completed: false }, // Correct field name
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const incompleteTaskData = user.tasks;
    res.status(200).json({ data: incompleteTaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
