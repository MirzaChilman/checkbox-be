/*
  Warnings:

  - You are about to alter the column `name` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- DropIndex
DROP INDEX "Task_dueDate_createDate_idx";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500);

-- CreateIndex
CREATE INDEX "Task_dueDate_createDate_name_idx" ON "Task"("dueDate", "createDate", "name");
