import { createAsyncThunk } from "@reduxjs/toolkit";

import { ProblemRating } from "../../common/types";

/* ---------------------------------- Store --------------------------------- */

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

/* ---------------------------------- Load ---------------------------------- */

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
