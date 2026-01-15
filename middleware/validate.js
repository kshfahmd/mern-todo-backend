const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // ✅ Zod error details are in `result.error.issues`
      const issues = result.error?.issues || [];

      return res.status(400).json({
        message: "Validation error",
        errors: issues.map((issue) => ({
          field: issue.path?.join(".") || "unknown",
          message: issue.message,
        })),
      });
    }

    req.body = result.data; // sanitized
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Validation middleware error",
      error: err.message,
    });
  }
};

module.exports = validate;
