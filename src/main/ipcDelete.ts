import { ipcMain } from "electron";

import { prisma } from "./prismaClient";
import { Problem } from "../renderer/src/common/types";

export const deleteProblem = ipcMain.handle(
  "DELETE_PROBLEM",
  async (__, problem: Problem) => {
    await prisma.problem.delete({
      where: {
        contestId_index: { contestId: problem.contestId, index: problem.index },
      },
    });
  }
);
