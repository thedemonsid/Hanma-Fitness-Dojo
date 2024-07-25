/*
  Warnings:

  - You are about to drop the column `how_to_make` on the `meals` table. All the data in the column will be lost.
  - Made the column `imageUrl` on table `meals` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('PUSH', 'PULL', 'LEGS', 'CORE', 'FULL_BODY');

-- CreateEnum
CREATE TYPE "TargetMuscle" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'ABS', 'QUADS', 'HAMSTRINGS', 'CALVES', 'GLUTES', 'ADDUCTORS', 'ABDUCTORS', 'TRAPS', 'LATS', 'LOWER_BACK');

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "how_to_make",
ALTER COLUMN "imageUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "movementType" "MovementType" NOT NULL DEFAULT 'FULL_BODY',
ADD COLUMN     "targetMuscle" "TargetMuscle"[];
