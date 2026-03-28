import Task from "../models/task.models.js";

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id
    });

    res.status(201).json({
      message: "Task created",
      task
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export default {createTask};