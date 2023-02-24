import { createAsyncThunk } from "@reduxjs/toolkit";

import { Problem, ProblemRating } from "../../../common/types";

/* -------------------------------------------------------------------------- */
/*                                    Store                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Problem tags ------------------------------ */

export const storeProblemTags = createAsyncThunk(
  "cf/storeProblemTags",
  async (problemTags: string[]) => await cf.storeProblemTags(problemTags)
);

/* ----------------------------- Problem rating ----------------------------- */

export const storeProblemRating = createAsyncThunk(
  "cf/storeProblemRating",
  async (problemRating: ProblemRating) =>
    await cf.storeProblemRating(problemRating)
);

export const storeProblem = createAsyncThunk(
  "cf/storeProblem",
  async (problem: Problem) => await cf.storeProblem(problem)
);

/* -------------------------------------------------------------------------- */
/*                                    Load                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Problem tags ------------------------------ */

export const loadProblemTags = createAsyncThunk(
  "cf/loadProblemTags",
  async () => await cf.loadProblemTags()
);

/* ----------------------------- Problem rating ----------------------------- */

export const loadProblemRating = createAsyncThunk(
  "cf/loadProblemRating",
  async () => await cf.loadProblemRating()
);

export const loadProblems = createAsyncThunk(
  "cf/loadProblems",
  async () => await cf.loadProblems()
);
