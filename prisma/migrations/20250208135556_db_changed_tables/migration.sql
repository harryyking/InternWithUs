/*
  Warnings:

  - You are about to drop the column `companyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `industryId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `posterId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `responsibilities` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Industry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompanyAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JobSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedJobs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apply` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_industryId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_industryId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_posterId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyAdmin" DROP CONSTRAINT "_CompanyAdmin_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyAdmin" DROP CONSTRAINT "_CompanyAdmin_B_fkey";

-- DropForeignKey
ALTER TABLE "_JobSkills" DROP CONSTRAINT "_JobSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobSkills" DROP CONSTRAINT "_JobSkills_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedJobs" DROP CONSTRAINT "_SavedJobs_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedJobs" DROP CONSTRAINT "_SavedJobs_B_fkey";

-- DropIndex
DROP INDEX "Job_companyId_idx";

-- DropIndex
DROP INDEX "Job_industryId_idx";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "companyId",
DROP COLUMN "industryId",
DROP COLUMN "posterId",
DROP COLUMN "requirements",
DROP COLUMN "responsibilities",
ADD COLUMN     "apply" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "region" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "skill" TEXT[],
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Industry";

-- DropTable
DROP TABLE "JobApplication";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "UserPreference";

-- DropTable
DROP TABLE "UserSkill";

-- DropTable
DROP TABLE "_CompanyAdmin";

-- DropTable
DROP TABLE "_JobSkills";

-- DropTable
DROP TABLE "_SavedJobs";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- DropEnum
DROP TYPE "CompanySize";

-- DropEnum
DROP TYPE "SkillLevel";

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
