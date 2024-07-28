import { z } from "zod";

const userSchema = z.object({
  id: z.string().cuid().optional(), //* Optional because it's auto-generated
  kindeId: z.string().min(1, "kindeId is required"), // ! Required
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().optional(),
  gender: z.string().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  fitnessGoal: z.string().optional(),
  imageUrl: z.string().url().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  createdAt: z.date().optional(), //* Optional because it's auto-generated
  updatedAt: z.date().optional(), //* Optional because it's auto-generated
});

export default userSchema;
