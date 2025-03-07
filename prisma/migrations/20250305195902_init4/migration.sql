/*
  Warnings:

  - You are about to drop the column `Total` on the `Ambulance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ambulance" DROP COLUMN "Total",
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;
