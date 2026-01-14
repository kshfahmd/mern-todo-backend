const { z } = require("zod");

const priorityEnum = z.enum(["low", "medium", "high"]);

const createTodoSchema = z.object({
  text: z.string().trim().min(2, "Todo must be at least 2 characters").max(200),
  dueDate: z.string().optional().nullable(), // ISO string or null
  priority: priorityEnum.optional(),
});

const updateTodoSchema = z.object({
  text: z.string().trim().min(2).max(200).optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().optional().nullable(),
  priority: priorityEnum.optional(),
});

module.exports = { createTodoSchema, updateTodoSchema };
