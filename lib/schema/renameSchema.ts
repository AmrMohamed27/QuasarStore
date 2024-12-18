import { z } from "zod";

export const renameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be less than 255 characters" }),
});
