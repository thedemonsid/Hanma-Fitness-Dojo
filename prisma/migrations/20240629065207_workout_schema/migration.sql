/*
  Warnings:

  - You are about to drop the column `description` on the `workout_plans` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `workout_plans` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `workout_plans` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `workout_plans` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'LEGS', 'ARMS', 'SHOULDERS', 'CORE');

-- AlterTable
ALTER TABLE "workout_plans" DROP COLUMN "description",
DROP COLUMN "instructions",
DROP COLUMN "title",
DROP COLUMN "videoUrl";

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "imageUrl" TEXT,
    "difficulty" "Difficulty" NOT NULL,
    "muscleGroup" "MuscleGroup"[],
    "workoutPlanId" TEXT NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
