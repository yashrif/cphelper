import { prisma } from "./prismaClient";
import { ProblemRating, ProblemShort } from "../../renderer/src/common/types";

/* -------------------------------------------------------------------------- */
/*                                     Cf                                     */
/* -------------------------------------------------------------------------- */

export const storeProblemTags = async (tags: string[]) => {
  tags?.forEach(async (tag) => {
    await prisma.tag.upsert({
      where: {
        tag: tag
      },
      create: {
        tag: tag
      },
      update: {}
    });
  });

  return tags;
};

export const storeProblemRating = async (problemRating: ProblemRating) =>
  (await prisma.problemRating.upsert({
    where: {
      id: 1
    },
    create: {
      id: 1,
      max: problemRating.max,
      min: problemRating.min
    },
    update: {
      max: problemRating.max,
      min: problemRating.min
    }
  })) as ProblemRating;

export const storeProblem = async (problem: ProblemShort) =>
  (await prisma.problem.upsert({
    where: {
      contestId_index: {
        contestId: problem.contestId,
        index: problem.index
      }
    },
    create: {
      contestId: problem.contestId,
      index: problem.index,
      name: problem.name,
      rating: problem.rating,
      solvedCount: problem.solvedCount
    },
    update: {
      name: problem.name,
      rating: problem.rating,
      solvedCount: problem.solvedCount
    }
  })) as ProblemShort;

/* -------------------------------------------------------------------------- */
/*                                 Preferences                                */
/* -------------------------------------------------------------------------- */

export const storeHandle = async (handle: string) => {
  const updatedSettings = await prisma.settings.upsert({
    where: {
      id: 1
    },
    create: {
      id: 1,
      handle: handle
    },
    update: {
      handle: handle
    }
  });

  return updatedSettings?.handle;
};
