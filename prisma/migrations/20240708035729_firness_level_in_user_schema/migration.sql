-- CreateEnum
CREATE TYPE "fitnessLevel" AS ENUM ('SKINNY', 'FIT', 'FAT', 'OBESE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fitnessLevel" "fitnessLevel" NOT NULL DEFAULT 'FAT';
