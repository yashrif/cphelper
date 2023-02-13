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
