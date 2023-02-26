-- CreateTable
CREATE TABLE "Tag" (
    "tag" TEXT NOT NULL PRIMARY KEY,
    "problemContestId" INTEGER,
    "problemIndex" TEXT,
    CONSTRAINT "Tag_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem" ("contestId", "index") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Problem" (
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "solvedCount" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProblemRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "max" INTEGER NOT NULL,
    "min" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "handle" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_contestId_index_key" ON "Problem"("contestId", "index");
