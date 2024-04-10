const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const Todo = require("../model/todoModel");
const User = require("../model/userModel");

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
};

const createTodo = async (req, res) => {
  const todos = await Todo.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });

  res.status(200).json(todos);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ error: "todo not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }

  if (todo.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({ error: "todo not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }

  if (todo.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const deletedTodo = await Todo.findByIdAndRemove(req.params.id);

  res.status(200).json(deletedTodo);
};

module.exports = {
  getAllTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
