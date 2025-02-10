/*
  Warnings:

  - You are about to drop the column `benefits` on the `Job` table. All the data in the column will be lost.
  - The `employmentType` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `locationType` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "benefits",
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" TEXT[],
DROP COLUMN "locationType",
ADD COLUMN     "locationType" TEXT[];

-- CreateIndex
CREATE INDEX "Job_employmentType_idx" ON "Job"("employmentType");

-- CreateIndex
CREATE INDEX "Job_locationType_idx" ON "Job"("locationType");
