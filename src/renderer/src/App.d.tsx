import { ProblemRating, Problem, ProblemShort } from "./common/types";

export interface Cf {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (problemTags: string[]) => Promise<string[]>;

  storeProblemRating: (problemRating: ProblemRating) => Promise<ProblemRating>;

  storeProblem: (problem: ProblemShort) => Promise<ProblemShort>;

  storeHandle: (handle: string) => Promise<string>;

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: () => Promise<string[] | null>;

  loadProblemRating: () => Promise<ProblemRating | null>;

  loadProblems: () => Promise<ProblemShort[] | null>;

  loadHandle: () => Promise<string | null>;

  /* --------------------------------- Delete --------------------------------- */

  deleteProblem: (problem: Problem) => Promise<ProblemShort>;
}

declare global {
  interface Window {
    cf: Cf;
  }
}
