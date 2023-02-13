import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { RootState } from "./store";
import { Loading, Problem, User } from "../common/types";
import apiCf from "../apis/apiCf";

/* ------------------------------- Interfaces ------------------------------- */

interface ProblemsFetchState {
  loading: Loading;
  problemList: Problem[];
  problemTags: string[];
  rating: {
    max: number;
    min: number;
  };
  user: User;
}

/* ------------------------------ Initial State ----------------------------- */

const initialState = {
  loading: Loading.IDLE,
} as ProblemsFetchState;

/* -------------------------------------------------------------------------- */
/*                            Async Action Creators                           */
/* -------------------------------------------------------------------------- */

export const fetchProblemList = createAsyncThunk(
  "cf/fetchProblemList",
  async (tags: string[]) => {
    const params = new URLSearchParams();
    tags.map((tag: string) => params.append("tags", tag));

    return (
      await apiCf.get("problemset.problems", {
        params: params,
      })
    ).data.result.problems;
  }
);

export const fetchProblemTags = createAsyncThunk(
  "cf/fetchProblemTags",
  async (__, { dispatch, getState }) => {
    await dispatch(fetchProblemList([]));

    const state = getState() as RootState;

    return _.chain(state.cf.problemList)
      .map("tags")
      .flatten()
      .uniq()
      .sort()
      .value();
  }
);

export const fetchRating = createAsyncThunk(
  "cf/fetchRating",
  async (__, { dispatch, getState }) => {
    await dispatch(fetchProblemList([]));

    const state = getState() as RootState;

    const ratings = _.chain(state.cf.problemList).map("rating").uniq().value();
    // const points = _.chain(state.cf.problemList).map("points").uniq().value();

    return {
      max: _.max(ratings) as number,
      min: _.min(ratings) as number,
    };
  }
);

export const fetchUser = createAsyncThunk(
  "cf/fetchUser",
  async (handle: string) =>
    (
      await apiCf.get("user.info", {
        params: {
          handles: handle,
        },
      })
    ).data.result[0]
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const problemSlice = createSlice({
  name: "problemList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProblemList.pending, (state) => {
      state.loading = Loading.PENDING;
    });
    builder.addCase(
      fetchProblemList.fulfilled,
      (state: ProblemsFetchState, action: PayloadAction<Problem[]>) => {
        state.loading = Loading.SUCEEDED;
        state.problemList = action.payload;
      }
    );
    builder.addCase(fetchProblemList.rejected, (state) => {
      state.loading = Loading.FAILED;
      state.problemList = [];
    });
    builder.addCase(
      fetchProblemTags.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.problemTags = action.payload;
      }
    );
    builder.addCase(fetchRating.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
  },
});

export default problemSlice.reducer;
