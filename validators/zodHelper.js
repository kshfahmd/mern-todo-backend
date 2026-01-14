const formatZodError = (zodError) => {
  return zodError.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

module.exports = { formatZodError };
