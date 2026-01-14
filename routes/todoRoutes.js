const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

router.post("/", createTodo);
router.get("/", getTodos);

// Update todo text
router.put("/:id", updateTodo);

// Delete todo
router.delete("/:id", deleteTodo);

// Toggle completed
router.patch("/:id/toggle", toggleTodo);

module.exports = router;
