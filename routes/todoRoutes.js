const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

// ✅ all todo routes are protected
router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/toggle", protect, toggleTodo);

module.exports = router;
