/*
  Warnings:

  - You are about to drop the column `mealType` on the `diet_plans` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionalInfo` on the `diet_plans` table. All the data in the column will be lost.
  - You are about to drop the column `recipe` on the `diet_plans` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "diet_plans" DROP CONSTRAINT "diet_plans_userId_fkey";

-- AlterTable
ALTER TABLE "diet_plans" DROP COLUMN "mealType",
DROP COLUMN "nutritionalInfo",
DROP COLUMN "recipe",
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "mealType" "MealType" NOT NULL,
    "recipe" TEXT,
    "dietPlanId" TEXT,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diet_plans" ADD CONSTRAINT "diet_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_dietPlanId_fkey" FOREIGN KEY ("dietPlanId") REFERENCES "diet_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
