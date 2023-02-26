import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  Loading,
  Problem,
  ProblemRating,
  ProblemShort,
  Submission,
  User
} from "../../common/types";
import * as cf from "../actions/cf/cfActions";

/* ------------------------------- Interfaces ------------------------------- */

interface ProblemsFetchState {
  addedProblems: ProblemShort[];
  loading: {
    addedProblems: {
      load: Loading;
      store: Loading;
    };
    problemRating: {
      fetch: Loading;
      load: Loading;
      store: Loading;
      fetchAndStore: Loading;
    };
    problemSet: Loading;
    problemTags: {
      fetch: Loading;
      load: Loading;
      store: Loading;
      fetchAndStore: Loading;
    };
    user: Loading;
    userRatingHistory: Loading;
    userStatus: Loading;
    userRatingHistoryAndStatus: Loading;
  };
  problemSet: Problem[];
  problemTags: string[];
  problemRating: ProblemRating;
  user: User;
  userRatingHistory: number[];
  userStatus: Submission[];
}

/* ------------------------------ Initial State ----------------------------- */

const initialState = {
  loading: {
    addedProblems: {
      load: Loading.IDLE,
      store: Loading.IDLE
    },
    problemRating: {
      fetch: Loading.IDLE,
      load: Loading.IDLE,
      store: Loading.IDLE,
      fetchAndStore: Loading.IDLE
    },
    problemSet: Loading.IDLE,
    problemTags: {
      fetch: Loading.IDLE,
      load: Loading.IDLE,
      store: Loading.IDLE,
      fetchAndStore: Loading.IDLE
    },
    user: Loading.IDLE,
    userRatingHistory: Loading.IDLE,
    userStatus: Loading.IDLE,
    userRatingHistoryAndStatus: Loading.IDLE
  }
} as ProblemsFetchState;

/**
 *                                  !! IMPORTANT
 *      * TODO: Make problem list object with the key of contestId & index *
 * * Insted of using PayloadAction<> assign return type to the actions creators *
 */

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const problemSlice = createSlice({
  name: "cf",
  initialState,
  reducers: {
    /* -------------------------- Update added problem -------------------------- */

    addProblem: (state, action: PayloadAction<Problem>) => {
      if (state.addedProblems) {
        if (
          !_.find(current(state.addedProblems), {
            contestId: action.payload.contestId,
            index: action.payload.index
          })
        )
          state.addedProblems.push(action.payload as ProblemShort);
      } else state.addedProblems = [action.payload as ProblemShort];
    },

    deleteProblem: (state, action: PayloadAction<Problem>) => {
      state.addedProblems = current(state.addedProblems).filter((problem) => {
        return !(
          problem.contestId === action.payload.contestId && problem.index === action.payload.index
        );
      });
    }
  },

  extraReducers: (builder) => {
    /* ------------------------------ Problem List ------------------------------ */

    builder.addCase(cf.fetchProblemSet.pending, (state) => {
      state.loading.problemSet = Loading.PENDING;
    });

    builder.addCase(cf.fetchProblemSet.fulfilled, (state, action: PayloadAction<Problem[]>) => {
      state.loading.problemSet = Loading.SUCCEEDED;
      state.problemSet = action.payload;
    });

    builder.addCase(cf.fetchProblemSet.rejected, (state) => {
      state.loading.problemSet = Loading.FAILED;
      // state.problemSet = [];
    });

    /* ------------------------------ Problem Tags ------------------------------ */

    builder.addCase(cf.fetchProblemTags.pending, (state) => {
      state.loading.problemTags.fetch = Loading.PENDING;
    });

    builder.addCase(cf.fetchProblemTags.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.loading.problemTags.fetch = Loading.SUCCEEDED;
      state.problemTags = action.payload;
    });

    builder.addCase(cf.fetchProblemTags.rejected, (state) => {
      state.loading.problemTags.fetch = Loading.FAILED;
    });

    /* ----------------------------- Problem Rating ----------------------------- */

    builder.addCase(cf.fetchProblemRating.pending, (state) => {
      state.loading.problemRating.fetch = Loading.PENDING;
    });

    builder.addCase(cf.fetchProblemRating.fulfilled, (state, action) => {
      state.loading.problemRating.fetch = Loading.SUCCEEDED;
      state.problemRating = action.payload;
    });

    builder.addCase(cf.fetchProblemRating.rejected, (state) => {
      state.loading.problemRating.fetch = Loading.FAILED;
    });

    /* ---------------------------------- User ---------------------------------- */

    builder.addCase(cf.fetchUser.pending, (state) => {
      state.loading.user = Loading.PENDING;
    });

    builder.addCase(cf.fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading.user = Loading.SUCCEEDED;
      state.user = action.payload;
    });

    builder.addCase(cf.fetchUser.rejected, (state) => {
      state.loading.user = Loading.FAILED;
    });

    /* --------------------------- User Rating History -------------------------- */

    builder.addCase(cf.fetchUserRatingHistory.pending, (state) => {
      state.loading.userRatingHistory = Loading.PENDING;
    });

    builder.addCase(
      cf.fetchUserRatingHistory.fulfilled,
      (state, action: PayloadAction<number[]>) => {
        state.loading.userRatingHistory = Loading.SUCCEEDED;
        state.userRatingHistory = action.payload;
      }
    );

    builder.addCase(cf.fetchUserRatingHistory.rejected, (state) => {
      state.loading.userRatingHistory = Loading.FAILED;
      // state.userRatingHistory = [];
    });

    /* ------------------------------- User Status ------------------------------ */

    builder.addCase(cf.fetchUserStatus.pending, (state) => {
      state.loading.userStatus = Loading.PENDING;
    });

    builder.addCase(cf.fetchUserStatus.fulfilled, (state, action: PayloadAction<Submission[]>) => {
      state.loading.userStatus = Loading.SUCCEEDED;
      state.userStatus = action.payload;
    });

    builder.addCase(cf.fetchUserStatus.rejected, (state) => {
      state.loading.userStatus = Loading.FAILED;
    });

    /* -------------------------------------------------------------------------- */
    /*                                     DB                                     */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                    Store                                   */
    /* -------------------------------------------------------------------------- */

    /* ------------------------------ Problem tags ------------------------------ */

    builder.addCase(cf.storeProblemTags.pending, (state) => {
      state.loading.problemTags.store = Loading.PENDING;
    });

    builder.addCase(cf.storeProblemTags.fulfilled, (state) => {
      state.loading.problemTags.store = Loading.SUCCEEDED;
    });

    builder.addCase(cf.storeProblemTags.rejected, (state) => {
      state.loading.problemTags.store = Loading.FAILED;
    });

    /* ----------------------------- Problem rating ----------------------------- */

    builder.addCase(cf.storeProblemRating.pending, (state) => {
      state.loading.problemRating.store = Loading.PENDING;
    });

    builder.addCase(cf.storeProblemRating.fulfilled, (state) => {
      state.loading.problemRating.store = Loading.SUCCEEDED;
    });

    builder.addCase(cf.storeProblemRating.rejected, (state) => {
      state.loading.problemRating.store = Loading.FAILED;
    });

    /* ----------------------------- Update problem ----------------------------- */

    builder.addCase(cf.storeProblem.pending, (state) => {
      state.loading.addedProblems.store = Loading.PENDING;
    });

    builder.addCase(cf.storeProblem.fulfilled, (state) => {
      state.loading.addedProblems.store = Loading.SUCCEEDED;
    });

    builder.addCase(cf.storeProblem.rejected, (state) => {
      state.loading.addedProblems.store = Loading.FAILED;
    });

    /* -------------------------------------------------------------------------- */
    /*                                    Load                                    */
    /* -------------------------------------------------------------------------- */

    /* ------------------------------ Problem tags ------------------------------ */

    builder.addCase(cf.loadProblemTags.pending, (state) => {
      state.loading.problemTags.load = Loading.PENDING;
    });

    builder.addCase(cf.loadProblemTags.fulfilled, (state, action) => {
      state.loading.problemTags.load = Loading.SUCCEEDED;
      state.problemTags = action.payload ?? [];
    });

    builder.addCase(cf.loadProblemTags.rejected, (state) => {
      state.loading.problemTags.load = Loading.FAILED;
    });

    /* ----------------------------- Problem rating ----------------------------- */

    builder.addCase(cf.loadProblemRating.pending, (state) => {
      state.loading.problemRating.load = Loading.PENDING;
    });

    builder.addCase(cf.loadProblemRating.fulfilled, (state, action) => {
      state.loading.problemRating.load = Loading.SUCCEEDED;
      state.problemRating = action.payload ?? { min: 800, max: 3500 };
    });

    builder.addCase(cf.loadProblemRating.rejected, (state) => {
      state.loading.problemRating.load = Loading.FAILED;
    });

    /* ----------------------------- Update problem ----------------------------- */

    builder.addCase(cf.loadProblems.pending, (state) => {
      state.loading.addedProblems.load = Loading.PENDING;
    });

    builder.addCase(cf.loadProblems.fulfilled, (state, action) => {
      state.loading.addedProblems.load = Loading.SUCCEEDED;
      state.addedProblems = action.payload ?? [];
    });

    builder.addCase(cf.loadProblems.rejected, (state) => {
      state.loading.addedProblems.load = Loading.FAILED;
    });

    /* -------------------------------------------------------------------------- */
    /*                                   Hybrid                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------- fetchUserRatingHistoryAndStatus -------------------- */

    builder.addCase(cf.fetchUserRatingHistoryAndStatus.pending, (state) => {
      state.loading.userRatingHistoryAndStatus = Loading.PENDING;
    });

    builder.addCase(cf.fetchUserRatingHistoryAndStatus.fulfilled, (state) => {
      if (
        state.loading.user === Loading.SUCCEEDED &&
        state.loading.userRatingHistory === Loading.SUCCEEDED &&
        state.loading.userStatus === Loading.SUCCEEDED
      )
        state.loading.userRatingHistoryAndStatus = Loading.SUCCEEDED;
      else state.loading.userRatingHistoryAndStatus = Loading.FAILED;
    });

    builder.addCase(cf.fetchUserRatingHistoryAndStatus.rejected, (state) => {
      state.loading.userRatingHistoryAndStatus = Loading.FAILED;
    });

    /* ----------------------- Update Problem tags & store ---------------------- */

    builder.addCase(cf.updateProblemTagsAndStore.pending, (state) => {
      state.loading.problemTags.fetchAndStore = Loading.PENDING;
    });

    builder.addCase(cf.updateProblemTagsAndStore.fulfilled, (state) => {
      if (
        state.loading.problemTags.fetch === Loading.SUCCEEDED &&
        state.loading.problemTags.store === Loading.SUCCEEDED
      )
        state.loading.problemTags.fetchAndStore = Loading.SUCCEEDED;
      else state.loading.problemTags.fetchAndStore = Loading.FAILED;
    });

    builder.addCase(cf.updateProblemTagsAndStore.rejected, (state) => {
      state.loading.problemTags.fetchAndStore = Loading.FAILED;
    });

    /* ------------------------- Problem rating & store ------------------------- */

    builder.addCase(cf.updateProblemRatingAndStore.pending, (state) => {
      state.loading.problemRating.fetchAndStore = Loading.PENDING;
    });

    builder.addCase(cf.updateProblemRatingAndStore.fulfilled, (state) => {
      if (
        state.loading.problemRating.fetch === Loading.SUCCEEDED &&
        state.loading.problemRating.store === Loading.SUCCEEDED
      )
        state.loading.problemRating.fetchAndStore = Loading.SUCCEEDED;
      else state.loading.problemRating.fetchAndStore = Loading.FAILED;
    });

    builder.addCase(cf.updateProblemRatingAndStore.rejected, (state) => {
      state.loading.problemRating.fetchAndStore = Loading.FAILED;
    });
  }
});

export default problemSlice.reducer;
export const { addProblem, deleteProblem } = problemSlice.actions;
