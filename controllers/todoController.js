const Todo = require("../models/Todo");

// POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { text, dueDate, priority } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await Todo.create({
      text: text.trim(),
      user: req.user._id,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || "medium",
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { text, dueDate, priority, completed } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // allow partial updates
    if (text !== undefined) {
      if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Todo text is required" });
      }
      todo.text = text.trim();
    }

    if (priority !== undefined) {
      const allowed = ["low", "medium", "high"];
      if (!allowed.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }
      todo.priority = priority;
    }

    if (dueDate !== undefined) {
      // allow null to clear due date
      todo.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // ✅ ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await todo.deleteOne();
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

    // ✅ ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo, toggleTodo };
