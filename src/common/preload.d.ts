export interface Cf {
  storeProblemTags: (problemTags: string[]) => Promise<void>;
  loadProblemTags: () => Promise<string[]>;
}

declare global {
  const cf: Cf;
}
