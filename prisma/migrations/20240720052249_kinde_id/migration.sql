/*
  Warnings:

  - A unique constraint covering the columns `[kindeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "kindeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_kindeId_key" ON "users"("kindeId");
