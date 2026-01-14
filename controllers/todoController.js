const Todo = require("../models/Todo");

// POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await Todo.create({ text });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: text.trim() },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PATCH /api/todos/:id/toggle
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo, toggleTodo };

