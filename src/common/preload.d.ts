export interface Cf {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (problemTags: string[]) => Promise<void>;

  storeProblemRating: (problemRating: ProblemRating) => Promise<void>;

  storeProblem: (problem: Problem) => Promise<void>;

  storeHandle: (handle: string) => Promise<void>;

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: () => Promise<string[]>;

  loadProblemRating: () => Promise<ProblemRating>;

  loadProblems: () => Promise<Problem[]>;

  loadHandle: () => Promise<string>;
}

declare global {
  const cf: Cf;
}
