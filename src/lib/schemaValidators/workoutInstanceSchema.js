import { z } from "zod";

const workoutInstanceSchema = z.object({
  id: z.string().cuid().optional(), //* Optional because it's auto-generated
  sets: z.number().int().positive().default(3),
  repsPerSet: z.array(z.number().int().positive()),
  weightsPerSet: z.array(z.number().positive()),
  isCompleted: z.boolean().default(false),
  workoutId: z.string().cuid("workoutId is required"),
  workoutHistoryId: z.string().cuid("workoutHistoryId is required"),
  createdAt: z.date().optional(), //* Optional because it's auto-generated
  updatedAt: z.date().optional(), //* Optional because it's auto-generated
});

export default workoutInstanceSchema;
