import { z } from "zod";
import workoutInstanceSchema from "./workoutInstanceSchema";

const workoutSchema = z.object({
  name: z.string().min(1),
  howToDo: z.string().min(1).optional(),
  duration: z.number().int().positive(),
  movementType: z.enum(["PUSH", "PULL", "LEGS", "CORE", "FULL_BODY"]),
  targetMuscle: z.array(
    z.enum([
      "CHEST",
      "BACK",
      "SHOULDERS",
      "BICEPS",
      "TRICEPS",
      "FOREARMS",
      "ABS",
      "QUADS",
      "HAMSTRINGS",
      "CALVES",
      "GLUTES",
      "ADDUCTORS",
      "ABDUCTORS",
      "TRAPS",
      "LATS",
      "LOWER_BACK",
    ])
  ),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  workout_instance: z.array(workoutInstanceSchema).optional(),
  createdAt: z.date().optional(), //* Optional because it's auto-generated
  updatedAt: z.date().optional(), //* Optional because it's auto-generated
});

export default workoutSchema;
