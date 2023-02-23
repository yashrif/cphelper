import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Loading } from "../../common/types";

interface Preferences {
  handle: string;
  loading: {
    handle: {
      load: Loading;
      store: Loading;
    };
  };
}

const initialState = {
  loading: {
    handle: { load: Loading.IDLE, store: Loading.IDLE },
  },
} as Preferences;

/* -------------------------------------------------------------------------- */
/*                            Async action creators                           */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                     DB                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    Store                                   */
/* -------------------------------------------------------------------------- */

export const storeHandle = createAsyncThunk(
  "preferences/storeHandle",
  async (handle: string) => await cf.storeHandle(handle)
);

/* -------------------------------------------------------------------------- */
/*                                    Load                                    */
/* -------------------------------------------------------------------------- */

export const loadHandle = createAsyncThunk(
  "preferences/loadHandle",
  async () => await cf.loadHandle()
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setHandle: (state, action: PayloadAction<string>) => {
      state.handle = action.payload;
    },
  },
  extraReducers(builder) {
    /* -------------------------------------------------------------------------- */
    /*                                     DB                                     */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                    Store                                   */
    /* -------------------------------------------------------------------------- */

    builder.addCase(storeHandle.pending, (state) => {
      state.loading.handle.store = Loading.PENDING;
    });

    builder.addCase(storeHandle.fulfilled, (state) => {
      state.loading.handle.store = Loading.SUCCEEDED;
    });

    builder.addCase(storeHandle.rejected, (state) => {
      state.loading.handle.store = Loading.FAILED;
    });

    /* -------------------------------------------------------------------------- */
    /*                                    Load                                    */
    /* -------------------------------------------------------------------------- */

    builder.addCase(loadHandle.pending, (state) => {
      state.loading.handle.load = Loading.PENDING;
    });

    builder.addCase(
      loadHandle.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading.handle.load = Loading.SUCCEEDED;
        state.handle = action.payload;
      }
    );

    builder.addCase(loadHandle.rejected, (state) => {
      state.loading.handle.load = Loading.FAILED;
    });
  },
});

export default preferencesSlice.reducer;
export const { setHandle } = preferencesSlice.actions;
