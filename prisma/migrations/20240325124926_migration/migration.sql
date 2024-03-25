/*
  Warnings:

  - A unique constraint covering the columns `[gameId,playerId]` on the table `PlayerStats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `PlayerStats_playerId_key` ON `PlayerStats`;

-- AlterTable
ALTER TABLE `PlayerStats` ADD COLUMN `gameId` INTEGER NOT NULL DEFAULT 14;

-- CreateIndex
CREATE UNIQUE INDEX `PlayerStats_gameId_playerId_key` ON `PlayerStats`(`gameId`, `playerId`);
