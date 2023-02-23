import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ColorThief from "color-thief-ts";

import { ColorArray, Loading } from "../../common/types";

interface Component {
  loading: {
    profileColorPalette: Loading;
  };
  problemRatingRange: [number, number];
  problemsPerPage: number;
  profileColorPalette: ColorArray[];
  selectedProblemTags: string[];
}

const initialState = {
  loading: {
    profileColorPalette: Loading.IDLE,
  },
  problemsPerPage: 20,
} as Component;

export const generateColorPalette = createAsyncThunk(
  "utils/generateColorPalette",
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
  name: "utils",
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
    /* ------------------------------ Color Palette ----------------------------- */

    builder.addCase(generateColorPalette.pending, (state) => {
      state.loading.profileColorPalette = Loading.PENDING;
    });

    builder.addCase(
      generateColorPalette.fulfilled,
      (state, action: PayloadAction<ColorArray[]>) => {
        state.loading.profileColorPalette = Loading.SUCCEEDED;
        state.profileColorPalette = action.payload;
      }
    );

    builder.addCase(generateColorPalette.rejected, (state) => {
      state.loading.profileColorPalette = Loading.FAILED;
    });
  },
});

export default componentSlice.reducer;
export const {
  setProblemRatingRange,
  setProblemsPerPage,
  updateSelectedProblemTags,
} = componentSlice.actions;
