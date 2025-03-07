/*
  Warnings:

  - You are about to drop the column `total` on the `Ambulance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ambulance" DROP COLUMN "total",
ADD COLUMN     "Total" INTEGER NOT NULL DEFAULT 0;
