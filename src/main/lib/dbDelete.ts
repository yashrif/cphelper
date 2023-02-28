import { prisma } from "./prismaClient";
import { ProblemShort } from "../../renderer/src/common/types";

export const deleteProblem = async (problem: ProblemShort): Promise<ProblemShort> =>
  (await prisma.problem.delete({
    where: {
      contestId_index: { contestId: problem.contestId, index: problem.index }
    }
  })) as ProblemShort;
