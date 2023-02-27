import * as _ from "lodash";

import { prisma } from "./prismaClient";

export const loadProblemTags = async () =>
  _.map(
    await prisma.tag.findMany({
      select: {
        tag: true
      }
    }),
    "tag"
  );

export const loadProblemRating = async () =>
  await prisma.problemRating.findUnique({
    select: { id: false, max: true, min: true },
    where: {
      id: 1
    }
  });

export const loadProblems = async () => await prisma.problem.findMany();

/* -------------------------------------------------------------------------- */
/*                                 Preferences                                */
/* -------------------------------------------------------------------------- */

export const loadHandle = async () =>
  (
    await prisma.settings.findUnique({
      where: { id: 1 },
      select: {
        handle: true
      }
    })
  )?.handle;
