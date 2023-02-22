import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadProblemTags = createAsyncThunk(
  "cf/loadProblemTags",
  async () => await cf.loadProblemTags()
);
