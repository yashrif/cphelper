/*
  Warnings:

  - The primary key for the `ProblemRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ProblemRating` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProblemRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "max" INTEGER NOT NULL,
    "min" INTEGER NOT NULL
);
INSERT INTO "new_ProblemRating" ("id", "max", "min") SELECT "id", "max", "min" FROM "ProblemRating";
DROP TABLE "ProblemRating";
ALTER TABLE "new_ProblemRating" RENAME TO "ProblemRating";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
