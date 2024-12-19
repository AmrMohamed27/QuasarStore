import { z } from "zod";

export const shareSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" }),
});
