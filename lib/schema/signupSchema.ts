import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(255, { message: "Name must be at most 255 characters long" }),
  email: z.string().email({ message: "Invalid email" }),
});
