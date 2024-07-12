/*
  Warnings:

  - You are about to drop the column `filledForms` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "filledForms",
ADD COLUMN     "flagfilled" BOOLEAN DEFAULT false;
