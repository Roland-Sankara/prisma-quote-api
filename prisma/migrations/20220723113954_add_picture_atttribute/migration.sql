/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[picture]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picture` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_imageUrl_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "imageUrl",
ADD COLUMN     "picture" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_picture_key" ON "Author"("picture");
