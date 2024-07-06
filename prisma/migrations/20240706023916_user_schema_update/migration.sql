-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('Cardio', 'StrengthTraining', 'HIIT', 'Yoga', 'Mixed');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ExerciseType" "ExerciseType" NOT NULL DEFAULT 'Mixed',
ADD COLUMN     "frequency" TEXT DEFAULT '3 Days a week',
ALTER COLUMN "healthConditions" SET DEFAULT 'Healthy',
ALTER COLUMN "fitnessGoal" SET DEFAULT 'Overall Fitness',
ALTER COLUMN "intensityLevel" SET DEFAULT 'MEDIUM';
