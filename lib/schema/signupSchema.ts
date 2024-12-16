import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2).max(255),
  email: z.string().email({ message: "Invalid email" }),
});
