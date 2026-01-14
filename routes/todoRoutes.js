const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../validators/todoValidators");

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

// all todo routes are protected
router.post("/", protect, validate(createTodoSchema), createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, validate(updateTodoSchema), updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/toggle", protect, toggleTodo);

module.exports = router;
