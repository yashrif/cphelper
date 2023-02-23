import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Loading } from "../../common/types";

interface settings {
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
} as settings;

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
  "settings/storeHandle",
  async (handle: string) => await cf.storeHandle(handle)
);

/* -------------------------------------------------------------------------- */
/*                                    Load                                    */
/* -------------------------------------------------------------------------- */

export const loadHandle = createAsyncThunk(
  "settings/loadHandle",
  async () => await cf.loadHandle()
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const settingsSlice = createSlice({
  name: "settings",
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

export default settingsSlice.reducer;
export const { setHandle } = settingsSlice.actions;
