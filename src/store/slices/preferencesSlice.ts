import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Preferences {
  handle: string;
}

const initialState = {
  handle: "Yashrif",
} as Preferences;

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const preferencesSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setHandle: (state, action: PayloadAction<string>) => {
      state.handle = action.payload;
    },
  },
});

export default preferencesSlice.reducer;
