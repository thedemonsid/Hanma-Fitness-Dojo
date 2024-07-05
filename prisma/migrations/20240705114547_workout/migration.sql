/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_workoutPlanId_fkey";

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "intensity" "Intensity",
ALTER COLUMN "workoutPlanId" DROP NOT NULL;

-- DropTable
DROP TABLE "activity_logs";

-- DropEnum
DROP TYPE "ActivityType";

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
