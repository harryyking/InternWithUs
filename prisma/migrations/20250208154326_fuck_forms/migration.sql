/*
  Warnings:

  - You are about to drop the column `description` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `gpa` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `Project` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "description",
DROP COLUMN "gpa",
ADD COLUMN     "isCurrently" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "tools",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isCurrently" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "isCurrently" BOOLEAN NOT NULL DEFAULT false;
