import { z } from "zod";

const workoutInstanceSchema = z.object({
  id: z.string().cuid(),
  sets: z.number().int().positive().default(3),
  repsPerSet: z.array(z.number().int().positive()),
  weightsPerSet: z.array(z.number().positive()),
  isCompleted: z.boolean().default(false),
  workoutId: z.string().cuid(),
  workoutHistoryId: z.string().cuid(),
});

export default workoutInstanceSchema;
