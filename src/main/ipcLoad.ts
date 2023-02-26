import { ipcMain } from "electron";
import * as _ from "lodash";

import { prisma } from "./prismaClient";

export const loadProblemTags = ipcMain.handle("LOAD_PROBLEM_TAGS", async () =>
  _.map(
    await prisma.tag.findMany({
      select: {
        tag: true,
      },
    }),
    "tag"
  )
);

export const loadProblemRating = ipcMain.handle(
  "LOAD_PROBLEM_RATING",
  async () =>
    await prisma.problemRating.findUnique({
      select: { id: false, max: true, min: true },
      where: {
        id: 1,
      },
    })
);

export const loadProblems = ipcMain.handle("LOAD_PROBLEMS", async () => {
  const problems = await prisma.problem.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  return problems.map((problem) => {
    const tags = _.map(problem.tags, "tag");
    const updatedTag = _.omit(problem, ["tags"]);

    return { ...updatedTag, tags };
  });
});

/* -------------------------------------------------------------------------- */
/*                                 Preferences                                */
/* -------------------------------------------------------------------------- */

export const loadHandle = ipcMain.handle(
  "LOAD_HANDLE",
  async () =>
    (
      await prisma.settings.findUnique({
        where: { id: 1 },
        select: {
          handle: true,
        },
      })
    )?.handle
);
