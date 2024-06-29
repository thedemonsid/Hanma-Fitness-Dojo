/*
  Warnings:

  - You are about to drop the column `fitnessGoals` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fitnessGoals",
ADD COLUMN     "dietPreference" TEXT,
ADD COLUMN     "fitnessGoal" TEXT,
ADD COLUMN     "intensityLevel" "Intensity";
