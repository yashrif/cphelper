import { ipcMain } from "electron";

import { prisma } from "./prismaClient";
import { storeHandle, storeProblem, storeProblemRating, storeProblemTags } from "./dbStore";
import { Problem, ProblemRating, ProblemShort } from "../../renderer/src/common/types";
import { loadHandle, loadProblemRating, loadProblems, loadProblemTags } from "./dbLoad";
import { deleteProblem } from "./dbDelete";

/* ---------------------------------- Store --------------------------------- */

ipcMain.handle("STORE_PROBLEM_TAGS", (_, tags: string[]) => {
  storeProblemTags(tags)
    .then(async () => {
      await prisma.$disconnect();
      return tags;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return [];
    });
});

ipcMain.handle("STORE_PROBLEM_RATING", (_, problemRating: ProblemRating) => {
  storeProblemRating(problemRating)
    .then(async () => {
      await prisma.$disconnect();
      return problemRating;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return {};
    });
});

ipcMain.handle("STORE_PROBLEM", (_, problem: ProblemShort) => {
  storeProblem(problem)
    .then(async () => {
      await prisma.$disconnect();
      return problem;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return {};
    });
});

ipcMain.handle("STORE_HANDLE", (_, handle: string) => {
  storeHandle(handle)
    .then(async () => {
      await prisma.$disconnect();
      return handle;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return {};
    });
});

/* ---------------------------------- Load ---------------------------------- */

ipcMain.handle("LOAD_PROBLEM_TAGS", async () => await loadProblemTags());

ipcMain.handle("LOAD_PROBLEM_RATING", async () => await loadProblemRating());

ipcMain.handle("LOAD_PROBLEMS", async () => await loadProblems());

ipcMain.handle("LOAD_HANDLE", async () => await loadHandle());

/* --------------------------------- Delete --------------------------------- */

ipcMain.handle("DELETE_PROBLEM", async (_, problem: Problem) => await deleteProblem(problem));
