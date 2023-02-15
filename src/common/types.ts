export enum Loading {
  "IDLE",
  "PENDING",
  "SUCEEDED",
  "FAILED",
}

export interface Problem {
  contestId: number;
  index: string;
  name: string;
  rating: number;
  tags: string[];
  type: string;
}

export interface Submission {
  creationTimeSeconds: number;
  id: number;
  problem: Problem;
  programmingLanguage: string;
  verdict:keyof typeof Verdict;
}

export interface User {
  avatar: string;
  city: string;
  contribution: number;
  country: string;
  firstName: string;
  friendOfCount: number;
  handle: string;
  lastName: string;
  lastOnlineTimeSeconds: number;
  maxRank: string;
  maxRating: number;
  organization: string;
  rank: string;
  rating: number;
  registrationTimeSeconds: number;
  titlePhoto: string;
}

export enum Verdict {
  "FAILED",
  "OK",
  "PARTIAL",
  "COMPILATION_ERROR",
  "RUNTIME_ERROR",
  "WRONG_ANSWER",
  "PRESENTATION_ERROR",
  "TIME_LIMIT_EXCEEDED",
  "MEMORY_LIMIT_EXCEEDED",
  "IDLENESS_LIMIT_EXCEEDED",
  "SECURITY_VIOLATED",
  "CRASHED",
  "INPUT_PREPARATION_CRASHED",
  "CHALLENGED",
  "SKIPPED",
  "TESTING",
  "REJECTED",
}
