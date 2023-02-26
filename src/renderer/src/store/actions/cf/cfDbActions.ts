import { createAsyncThunk } from "@reduxjs/toolkit";

import { Problem, ProblemRating } from "../../../common/types";

/* -------------------------------------------------------------------------- */
/*                               Store & Delete                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Problem tags ------------------------------ */

export const storeProblemTags = createAsyncThunk(
  "cf/storeProblemTags",
  async (problemTags: string[]) => await window.cf.storeProblemTags(problemTags)
);

/* ----------------------------- Problem rating ----------------------------- */

export const storeProblemRating = createAsyncThunk(
  "cf/storeProblemRating",
  async (problemRating: ProblemRating) => await window.cf.storeProblemRating(problemRating)
);

/* ------------------------------ Store problem ----------------------------- */

export const storeProblem = createAsyncThunk(
  "cf/storeProblem",
  async (problem: Problem) => await window.cf.storeProblem(problem)
);

/* ----------------------------- Delete problem ----------------------------- */

export const deleteProblem = createAsyncThunk(
  "cf/deleteProblem",
  async (problem: Problem) => await window.cf.deleteProblem(problem)
);

/* -------------------------------------------------------------------------- */
/*                                    Load                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Problem tags ------------------------------ */

export const loadProblemTags = createAsyncThunk(
  "cf/loadProblemTags",
  async () => await window.cf.loadProblemTags()
);

/* ----------------------------- Problem rating ----------------------------- */

export const loadProblemRating = createAsyncThunk(
  "cf/loadProblemRating",
  async () => await window.cf.loadProblemRating()
);

export const loadProblems = createAsyncThunk(
  "cf/loadProblems",
  async () => await window.cf.loadProblems()
);
