import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import apiCf from "../../../apis/apiCf";
import { Submission, Loading, Problem } from "../../../common/types";
import { RootState } from "../../store";

/* ---------------------------- Fetch problem Set --------------------------- */

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

/* --------------------------- Fetch problem tags --------------------------- */

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

/* --------------------- Fetch problem min & max rating --------------------- */

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

/* ------------------------------- Fetch user ------------------------------- */

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

/* ------------------------ Fetch user rating history ----------------------- */

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

/* ------------------------- Fetch user submissions ------------------------- */

export const fetchUserStatus = createAsyncThunk(
  "cf/fetchUserStatus",
  async (handle: string) => {
    let response: Submission[] = [];

    try {
      response = (
        await apiCf.get("https://codeforces.com/api/user.status", {
          params: {
            handle: handle,
            from: 1,
            count: 5,
          },
        })
      ).data.result as Submission[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 404)
          response = (
            await apiCf.get("https://codeforces.com/api/user.status", {
              params: {
                handle: handle,
                from: 1,
                count: 5,
              },
            })
          ).data.result as Submission[];
      } else {
        console.error(error);
      }
    }

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

/* ------------------ Fetch user, user rating & user submissions ----------------- */

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
