import { taskCollection } from "../Models/taskModel.js";

/*--------------------------get all task --------------------------------------*/
export const getAllTask = async (req, res, next) => {
  try {
    const UserId = req.User._id;
    const tasks = await taskCollection.find({ user: UserId });
    res.json({
      success: true,
      message: tasks.length > 0 ?tasks: "No Tasks Found"
    });
  } catch (error) {
    next();
  }
};

/*-------------------------- create new task --------------------------------------*/

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await taskCollection.create({ title, description, user: req.User._id });
    res.status(202).json({
      success: true,
      message: "task created succussfully",
    });
  } catch (error) {
    next(error);
  }
};

/*-------------------------- updatd task --------------------------------------*/

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Task = await taskCollection.findById(id);
    if (!Task) {
      return res.json({
        success: false,
        message: "Task not found",
      });
    }
    Task.isComplete = !Task.isComplete;
    await Task.save();
    res.json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    let Task = await taskCollection.findById(id);
    if (!Task) {
      return res.json({
        success: false,
        message: "Task Not Found",
      });
    }
    if (Task && Task.isComplete === false) {
      return res.json({
        success: false,
        message: "Task Not Complete Yet",
      });
    }
    Task = await taskCollection.findById(id);
    await Task.deleteOne();
    return res.json({
      success: true,
      message: Task,
    });
  } catch (error) {
    next(error);
  }
};
