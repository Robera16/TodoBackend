const express = require("express");
const router = express.Router();
const { todoValidator } = require("../middleware/todoValidator");
const { adminValidator } = require("../middleware/adminValidator");
const { protect } = require("../middleware/authMiddleware");

const {
  getAllTodos,
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

router
  .route("/")
  .get(protect, getTodos)
  .post(protect, todoValidator, createTodo);
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo).get(protect, getTodoById);

// for admin
router.get("/getAllTodos", protect, adminValidator, getAllTodos);

module.exports = router;
