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
  problemRating: {
    max: number;
    min: number;
  };
  user: User;
  userRatingHistory: number[];
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

export const fetchProblemRating = createAsyncThunk(
  "cf/fetchProblemRating",
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

export const fetchUserRatingHistory = createAsyncThunk(
  "cf/fetchUserRatingHistory",
  async (handle: string) => {
    const response = (
      await apiCf.get("https://codeforces.com/api/user.rating", {
        params: {
          handle: handle,
        },
      })
    ).data.result;

    return [0, ..._.chain(response).map("newRating").value()];
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const problemSlice = createSlice({
  name: "problemList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* ------------------------------ Problem List ------------------------------ */

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

    /* ------------------------------ Problem Tags ------------------------------ */

    builder.addCase(
      fetchProblemTags.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.problemTags = action.payload;
      }
    );

    /* ----------------------------- Problem Rating ----------------------------- */

    builder.addCase(fetchProblemRating.fulfilled, (state, action) => {
      state.problemRating = action.payload;
    });

    /* ---------------------------------- User ---------------------------------- */

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = Loading.PENDING;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );

    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = Loading.FAILED;
    });

    /* --------------------------- User Rating History -------------------------- */

    builder.addCase(fetchUserRatingHistory.pending, (state) => {
      state.loading = Loading.PENDING;
    });

    builder.addCase(
      fetchUserRatingHistory.fulfilled,
      (state, action: PayloadAction<number[]>) => {
        state.userRatingHistory = action.payload;
      }
    );

    builder.addCase(fetchUserRatingHistory.rejected, (state) => {
      state.loading = Loading.FAILED;
      state.userRatingHistory = [];
    });
  },
});

export default problemSlice.reducer;
