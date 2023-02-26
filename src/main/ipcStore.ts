import { ipcMain } from "electron";

import { prisma } from "./prismaClient";
import { Problem, ProblemRating } from "../renderer/src/common/types";

/* -------------------------------------------------------------------------- */
/*                                     Cf                                     */
/* -------------------------------------------------------------------------- */

export const storeProblemTags = ipcMain.handle(
  "STORE_PROBLEM_TAGS",
  async (__, tags: string[]) => {
    tags?.map(async (tag) => {
      await prisma.tag.upsert({
        where: {
          tag: tag,
        },
        create: {
          tag: tag,
        },
        update: {},
      });
    });
  }
);

export const storeProblemRating = ipcMain.handle(
  "STORE_PROBLEM_RATING",
  async (__, problemRating: ProblemRating) => {
    await prisma.problemRating.upsert({
      where: {
        id: 1,
      },
      create: {
        id: 1,
        max: problemRating.max,
        min: problemRating.min,
      },
      update: {
        max: problemRating.max,
        min: problemRating.min,
      },
    });
  }
);

export const storeProblem = ipcMain.handle(
  "STORE_PROBLEM",
  async (__, problem: Problem) => {
    const tags = problem?.tags;

    if (tags) {
      tags.map(async (tag) => {
        await prisma.problem.upsert({
          where: {
            contestId_index: {
              contestId: problem.contestId,
              index: problem.index,
            },
          },
          create: {
            contestId: problem.contestId,
            index: problem.index,
            name: problem.name,
            rating: problem.rating,
            solvedCount: problem.solvedCount,
            tags: {
              connectOrCreate: {
                where: {
                  tag: tag,
                },
                create: {
                  tag: tag,
                },
              },
            },
            type: problem.type,
          },
          update: {
            contestId: problem.contestId,
            index: problem.index,
            name: problem.name,
            rating: problem.rating,
            solvedCount: problem.solvedCount,
            tags: {
              connectOrCreate: {
                where: {
                  tag: tag,
                },
                create: {
                  tag: tag,
                },
              },
            },
            type: problem.type,
          },
        });
      });
    } else {
      await prisma.problem.upsert({
        where: {
          contestId_index: {
            contestId: problem.contestId,
            index: problem.index,
          },
        },
        create: {
          contestId: problem.contestId,
          index: problem.index,
          name: problem.name,
          rating: problem.rating,
          solvedCount: problem.solvedCount,
          type: problem.type,
        },
        update: {
          contestId: problem.contestId,
          index: problem.index,
          name: problem.name,
          rating: problem.rating,
          solvedCount: problem.solvedCount,

          type: problem.type,
        },
      });
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                 Preferences                                */
/* -------------------------------------------------------------------------- */

export const storeHandle = ipcMain.handle(
  "STORE_HANDLE",
  async (__, handle: string) => {
    await prisma.settings.upsert({
      where: {
        id: 1,
      },
      create: {
        id: 1,
        handle: handle,
      },
      update: {
        handle: handle,
      },
    });
  }
);
