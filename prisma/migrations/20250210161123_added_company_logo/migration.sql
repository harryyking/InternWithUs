/*
  Warnings:

  - You are about to drop the column `apply` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "apply",
ADD COLUMN     "companyLogo" TEXT[];
