import { prisma } from "./prismaClient";
import { Problem, ProblemShort } from "../../renderer/src/common/types";

export const deleteProblem = async (problem: Problem): Promise<ProblemShort> =>
  (await prisma.problem.delete({
    where: {
      contestId_index: { contestId: problem.contestId, index: problem.index }
    }
  })) as ProblemShort;
