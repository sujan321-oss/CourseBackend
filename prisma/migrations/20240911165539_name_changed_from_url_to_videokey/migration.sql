/*
  Warnings:

  - You are about to drop the column `videolink` on the `Videos` table. All the data in the column will be lost.
  - Added the required column `videokey` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "videolink",
ADD COLUMN     "videokey" TEXT NOT NULL;
