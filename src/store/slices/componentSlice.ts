import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ColorThief from "color-thief-ts";

import { ColorArray } from "../../common/types";

interface Component {
  problemRatingRange: [number, number];
  problemsPerPage: number;
  profileColorPalette: ColorArray[];
  selectedProblemTags: string[];
}

const initialState = {
  problemsPerPage: 20,
} as Component;

export const generateColorPalette = createAsyncThunk(
  "component/generateColorPalette",
  async ({
    url,
    numberOfColors = 5,
  }: {
    url: string;
    numberOfColors?: number;
  }) => {
    const colorThief = new ColorThief();
    return await colorThief.getPaletteAsync(url, numberOfColors);
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    updateSelectedProblemTags: (state, action: PayloadAction<string[]>) => {
      state.selectedProblemTags = action.payload;
    },

    setProblemRatingRange: (state, action: PayloadAction<[number, number]>) => {
      state.problemRatingRange = action.payload;
    },

    setProblemsPerPage: (state, action: PayloadAction<number>) => {
      state.problemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      generateColorPalette.fulfilled,
      (state, action: PayloadAction<ColorArray[]>) => {
        state.profileColorPalette = action.payload;
      }
    );
  },
});

export default componentSlice.reducer;
export const {
  setProblemRatingRange,
  setProblemsPerPage,
  updateSelectedProblemTags,
} = componentSlice.actions;
