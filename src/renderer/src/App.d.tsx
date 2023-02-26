import { ProblemRating, Problem } from "./common/types";

export interface Cf {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (problemTags: string[]) => Promise<void>;

  storeProblemRating: (problemRating: ProblemRating) => Promise<void>;

  storeProblem: (problem: Problem) => Promise<void>;

  storeHandle: (handle: string) => Promise<void>;

  /* --------------------------------- Delete --------------------------------- */

  deleteProblem: (problem: Problem) => Promise<void>;

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: () => Promise<string[] | null>;

  loadProblemRating: () => Promise<ProblemRating | null>;

  loadProblems: () => Promise<Problem[] | null>;

  loadHandle: () => Promise<string | null>;
}

declare global {
  interface Window {
    cf: Cf;
  }
}
