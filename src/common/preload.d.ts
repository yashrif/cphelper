export interface Cf {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (problemTags: string[]) => Promise<void>;

  storeProblemRating: (problemRating: ProblemRating) => Promise<void>;
  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: () => Promise<string[]>;

  loadProblemRating: () => Promise<ProblemRating>;
}

declare global {
  const cf: Cf;
}
