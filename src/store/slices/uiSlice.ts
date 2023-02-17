import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ColorThief from "color-thief-ts";

import { ColorArray } from "../../common/types";

interface Ui {
  profileColorPalette: ColorArray[];
}

const initialState = {} as Ui;

export const generateColorPalette = createAsyncThunk(
  "ui/generateColorPalette",
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

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      generateColorPalette.fulfilled,
      (state, action: PayloadAction<ColorArray[]>) => {
        state.profileColorPalette = action.payload;
      }
    );
  },
});

export default uiSlice.reducer;
