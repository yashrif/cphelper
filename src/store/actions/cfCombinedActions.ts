import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cf from "./cfActions";
import { Loading } from "../../common/types";

/* ------------------ Update problem tags and store into db ----------------- */

export const updateProblemTagsAndStore = createAsyncThunk(
  "cf/updateProblemTagsAndStore",
  async (_, { dispatch, getState }) => {
    await dispatch(cf.fetchProblemTags());
    const state = getState() as RootState;

    if (state.cf.loading.problemTags.fetch === Loading.SUCCEEDED)
      await dispatch(cf.storeProblemTags(state.cf.problemTags));
  }
);

/* ---------------------- Update problem rating & store --------------------- */

export const updateProblemRatingAndStore = createAsyncThunk(
  "cf/updateProblemRatingAndStore",
  async (_, { dispatch, getState }) => {
    await dispatch(cf.fetchProblemRating());
    const state = getState() as RootState;

    if (state.cf.loading.problemRating.fetch === Loading.SUCCEEDED)
      await dispatch(cf.storeProblemRating(state.cf.problemRating));
  }
);
