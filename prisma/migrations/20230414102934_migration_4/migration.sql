/*
  Warnings:

  - You are about to drop the column `format` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "format",
DROP COLUMN "version";
