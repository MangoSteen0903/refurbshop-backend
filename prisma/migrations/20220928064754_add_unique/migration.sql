/*
  Warnings:

  - A unique constraint covering the columns `[itemId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_itemId_userId_key" ON "Like"("itemId", "userId");
