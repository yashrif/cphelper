import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Loading, Problem } from "../common/types";
import apiCf from "../apis/apiCf";

interface ProblemsFetchState {
  loading: Loading;
  problems: Problem[];
}

const initialState = {
  loading: Loading.IDLE,
  problems: [],
} as ProblemsFetchState;

export const fetchProblems = createAsyncThunk("cf/fetchProblems", async () => {
  const response = await apiCf.get("problemset.problems", {
    params: {
      tags: "implementation",
    },
  });
  return response.data.result.problems;
});

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProblems.pending, (state:ProblemsFetchState) => {
      state.loading = Loading.PENDING;
    });
    builder.addCase(
      fetchProblems.fulfilled,
      (state: ProblemsFetchState, action: PayloadAction<Problem[]>) => {
        state.loading = Loading.SUCEEDED;
        state.problems = action.payload;
      }
    );
    builder.addCase(fetchProblems.rejected, (state:ProblemsFetchState) => {
      state.loading = Loading.FAILED;
      state.problems = [];
    });
  },
});

export default problemSlice.reducer;
