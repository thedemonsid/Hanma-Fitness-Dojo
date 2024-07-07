-- AlterTable
ALTER TABLE "users" ADD COLUMN     "filledForms" JSONB DEFAULT '{"onboarding": false, "workout": false, "diet": false}';
