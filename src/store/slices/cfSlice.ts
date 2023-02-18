import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { RootState } from "../store";
import { Loading, Problem, Submission, User } from "../../common/types";
import apiCf from "../../apis/apiCf";

/* ------------------------------- Interfaces ------------------------------- */

interface ProblemsFetchState {
  loading: {
    problemRating: number;
    problemSet: Loading;
    problemTags: Loading;
    user: Loading;
    userRatingHistory: Loading;
    userStatus: Loading;
    userRatingHistoryAndStatus: Loading;
  };
  problemSet: Problem[];
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
    problemSet: Loading.IDLE,
    problemTags: Loading.IDLE,
    user: Loading.IDLE,
    userRatingHistory: Loading.IDLE,
    userStatus: Loading.IDLE,
    userRatingHistoryAndStatus: Loading.IDLE,
  },
} as ProblemsFetchState;

/* -------------------------------------------------------------------------- */
/*                            Async Action Creators                           */
/* -------------------------------------------------------------------------- */

export const fetchProblemSet = createAsyncThunk(
  "cf/fetchProblemSet",
  async (tags: string[] = []) => {
    const params = new URLSearchParams();
    tags.map((tag: string) => params.append("tags", tag));

    const response = (
      await apiCf.get("problemset.problems", {
        params: params,
      })
    ).data.result;

    return response.problems.map((problem: Problem, index: number) => {
      problem.solvedCount = response.problemStatistics[index].solvedCount;
      return problem;
    });
  }
);

/* --- TODO: check if problem list updates with the nested action creators -- */
/* ------------------- if changes then make that isolated ------------------- */

export const fetchProblemTags = createAsyncThunk(
  "cf/fetchProblemTags",
  async (__, { dispatch, getState }) => {
    await dispatch(fetchProblemSet([]));

    const state = getState() as RootState;

    return _.chain(state.cf.problemSet)
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
    await dispatch(fetchProblemSet([]));

    const state = getState() as RootState;

    const ratings = _.chain(state.cf.problemSet).map("rating").uniq().value();

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

export const fetchUserRatingHistoryAndStatus = createAsyncThunk(
  "cf/fetchUserRatingAndStatus",
  async (handle: string, { dispatch, getState }) => {
    await dispatch(fetchUser(handle));
    await dispatch(fetchUserRatingHistory(handle));
    await dispatch(fetchUserStatus(handle));

    const state = getState() as RootState;
    if (state.cf.loading.user === Loading.FAILED)
      await dispatch(fetchUser(handle));
    if (state.cf.loading.userRatingHistory === Loading.FAILED)
      await dispatch(fetchUserRatingHistory(handle));
    if (state.cf.loading.userStatus === Loading.FAILED)
      await dispatch(fetchUserStatus(handle));
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const problemSlice = createSlice({
  name: "cf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* ------------------------------ Problem List ------------------------------ */

    builder.addCase(fetchProblemSet.pending, (state) => {
      state.loading.problemSet = Loading.PENDING;
    });

    builder.addCase(
      fetchProblemSet.fulfilled,
      (state, action: PayloadAction<Problem[]>) => {
        state.loading.problemSet = Loading.SUCCEEDED;
        state.problemSet = action.payload;
      }
    );

    builder.addCase(fetchProblemSet.rejected, (state) => {
      state.loading.problemSet = Loading.FAILED;
      // state.problemSet = [];
    });

    /* ------------------------------ Problem Tags ------------------------------ */

    builder.addCase(fetchProblemTags.pending, (state) => {
      state.loading.problemTags = Loading.PENDING;
    });

    builder.addCase(
      fetchProblemTags.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading.problemTags = Loading.SUCCEEDED;
        state.problemTags = action.payload;
      }
    );

    builder.addCase(fetchProblemTags.rejected, (state) => {
      state.loading.problemTags = Loading.FAILED;
    });

    /* ----------------------------- Problem Rating ----------------------------- */

    builder.addCase(fetchProblemRating.pending, (state) => {
      state.loading.problemRating = Loading.PENDING;
    });

    builder.addCase(fetchProblemRating.fulfilled, (state, action) => {
      state.loading.problemRating = Loading.SUCCEEDED;
      state.problemRating = action.payload;
    });

    builder.addCase(fetchProblemRating.rejected, (state) => {
      state.loading.problemRating = Loading.FAILED;
    });

    /* ---------------------------------- User ---------------------------------- */

    builder.addCase(fetchUser.pending, (state) => {
      state.loading.user = Loading.PENDING;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading.user = Loading.SUCCEEDED;
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
        state.loading.userRatingHistory = Loading.SUCCEEDED;
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
        state.loading.userStatus = Loading.SUCCEEDED;
        state.userStatus = action.payload;
      }
    );

    builder.addCase(fetchUserStatus.rejected, (state) => {
      state.loading.userStatus = Loading.FAILED;
    });

    /* --------------------- fetchUserRatingHistoryAndStatus -------------------- */

    builder.addCase(fetchUserRatingHistoryAndStatus.pending, (state) => {
      state.loading.userRatingHistoryAndStatus = Loading.PENDING;
    });

    builder.addCase(fetchUserRatingHistoryAndStatus.fulfilled, (state) => {
      state.loading.userRatingHistoryAndStatus = Loading.SUCCEEDED;
    });

    builder.addCase(fetchUserRatingHistoryAndStatus.rejected, (state) => {
      state.loading.userRatingHistoryAndStatus = Loading.FAILED;
    });
  },
});

export default problemSlice.reducer;
