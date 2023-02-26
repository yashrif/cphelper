/*
  Warnings:

  - You are about to drop the column `type` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `problemContestId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `problemIndex` on the `Tag` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "solvedCount" INTEGER NOT NULL
);
INSERT INTO "new_Problem" ("contestId", "index", "name", "rating", "solvedCount") SELECT "contestId", "index", "name", "rating", "solvedCount" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
CREATE UNIQUE INDEX "Problem_contestId_index_key" ON "Problem"("contestId", "index");
CREATE TABLE "new_Tag" (
    "tag" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Tag" ("tag") SELECT "tag" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
