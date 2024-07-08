-- CreateEnum
CREATE TYPE "EquipmentAccess" AS ENUM ('Gym', 'HomeEquipment', 'Both', 'Neither');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "equipmentAccess" "EquipmentAccess" NOT NULL DEFAULT 'Both';
