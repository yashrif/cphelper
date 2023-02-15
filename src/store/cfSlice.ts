import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { RootState } from "./store";
import { Loading, Problem, Submission, User } from "../common/types";
import apiCf from "../apis/apiCf";

/* ------------------------------- Interfaces ------------------------------- */

interface ProblemsFetchState {
  loading: {
    problemList: Loading;
    user: Loading;
    userRatingHistory: Loading;
    userStatus: Loading;
  };
  problemList: Problem[];
  problemTags: string[];
  problemRating: {
    max: number;
    min: number;
  };
  user: User;
  userRatingHistory: number[];
  userStatus: Submission[];
}

/* ------------------------------ Initial State ----------------------------- */

const initialState = {
  loading: {
    problemList: Loading.IDLE,
    user: Loading.IDLE,
    userRatingHistory: Loading.IDLE,
  },
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
  async (handle: string) =>
    (
      await apiCf.get("https://codeforces.com/api/user.rating", {
        params: {
          handle: handle,
        },
      })
    ).data.result
);

export const fetchUserStatus = createAsyncThunk(
  "cf/fetchUserStatus",
  async (handle: string) => {
    const response = (
      await apiCf.get("https://codeforces.com/api/user.status", {
        params: {
          handle: handle,
          from: 1,
          count: 5,
        },
      })
    ).data.result as Submission[];

    return response.map((e) =>
      _.pick(e, [
        "id",
        "problem",
        "verdict",
        "creationTimeSeconds",
        "programmingLanguage",
      ])
    );
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
      state.loading.problemList = Loading.PENDING;
    });

    builder.addCase(
      fetchProblemList.fulfilled,
      (state: ProblemsFetchState, action: PayloadAction<Problem[]>) => {
        state.loading.problemList = Loading.SUCEEDED;
        state.problemList = action.payload;
      }
    );

    builder.addCase(fetchProblemList.rejected, (state) => {
      state.loading.problemList = Loading.FAILED;
      // state.problemList = [];
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
      state.loading.user = Loading.PENDING;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading.user = Loading.SUCEEDED;
        state.user = action.payload;
      }
    );

    builder.addCase(fetchUser.rejected, (state) => {
      state.loading.user = Loading.FAILED;
    });

    /* --------------------------- User Rating History -------------------------- */

    builder.addCase(fetchUserRatingHistory.pending, (state) => {
      state.loading.userRatingHistory = Loading.PENDING;
    });

    builder.addCase(
      fetchUserRatingHistory.fulfilled,
      (state, action: PayloadAction<number[]>) => {
        state.loading.userRatingHistory = Loading.SUCEEDED;
        state.userRatingHistory = action.payload;
      }
    );

    builder.addCase(fetchUserRatingHistory.rejected, (state) => {
      state.loading.userRatingHistory = Loading.FAILED;
      // state.userRatingHistory = [];
    });

    /* ------------------------------- User Status ------------------------------ */

    builder.addCase(fetchUserStatus.pending, (state) => {
      state.loading.userStatus = Loading.PENDING;
    });

    builder.addCase(
      fetchUserStatus.fulfilled,
      (state, action: PayloadAction<Submission[]>) => {
        state.loading.userStatus = Loading.SUCEEDED;
        state.userStatus = action.payload;
      }
    );

    builder.addCase(fetchUserStatus.rejected, (state) => {
      state.loading.userStatus = Loading.FAILED;
    });
  },
});

export default problemSlice.reducer;
