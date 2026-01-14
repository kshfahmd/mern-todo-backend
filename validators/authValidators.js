const { z } = require("zod");

//Strong password policy
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must be less than 64 characters")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character");

//Name policy
// - 2 to 50 chars
const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces");

//Email policy
const emailSchema = z
  .string()
  .trim()
  .email("Invalid email format")
  .transform((val) => val.toLowerCase());

//Register schema
const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict(); //Reject extra fields (security)

//Login schema
const loginSchema = z
  .object({
    email: emailSchema,
    password: z.string().min(1, "Password is required").max(64),
  })
  .strict();

//Update profile schema
const updateProfileSchema = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
  })
  .strict();

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
