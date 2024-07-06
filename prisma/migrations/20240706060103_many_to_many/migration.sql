/*
  Warnings:

  - You are about to drop the column `userId` on the `diet_plans` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `workout_plans` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "diet_plans" DROP CONSTRAINT "diet_plans_userId_fkey";

-- DropForeignKey
ALTER TABLE "workout_plans" DROP CONSTRAINT "workout_plans_userId_fkey";

-- AlterTable
ALTER TABLE "diet_plans" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "workout_plans" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserToWorkoutPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DietPlanToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorkoutPlan_AB_unique" ON "_UserToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorkoutPlan_B_index" ON "_UserToWorkoutPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DietPlanToUser_AB_unique" ON "_DietPlanToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DietPlanToUser_B_index" ON "_DietPlanToUser"("B");

-- AddForeignKey
ALTER TABLE "_UserToWorkoutPlan" ADD CONSTRAINT "_UserToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkoutPlan" ADD CONSTRAINT "_UserToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietPlanToUser" ADD CONSTRAINT "_DietPlanToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "diet_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietPlanToUser" ADD CONSTRAINT "_DietPlanToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
