-- CreateEnum
CREATE TYPE "Region" AS ENUM ('INDIAN', 'AMERICAN', 'CHINESE', 'ITALIAN', 'MEXICAN', 'CONTINENTAL', 'OTHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "region" "Region" DEFAULT 'INDIAN';
