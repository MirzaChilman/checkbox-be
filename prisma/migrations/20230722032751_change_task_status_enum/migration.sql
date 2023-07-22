/*
  Warnings:

  - The values [NOT_URGENT,DUE_SOON,OVERDUE] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('NotUrgent', 'DueSoon', 'Overdue');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;
