import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Loading } from "../../common/types";

export interface settings {
  handle: string | null;
  loading: {
    handle: {
      load: Loading;
      store: Loading;
    };
  };
  isHandleValid: boolean;
  isHandleChanged: boolean;
}

const initialState = {
  loading: {
    handle: { load: Loading.IDLE, store: Loading.IDLE }
  },
  isHandleValid: false,
  isHandleChanged: false
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
  async (handle: string) => await window.cf.storeHandle(handle)
);

/* -------------------------------------------------------------------------- */
/*                                    Load                                    */
/* -------------------------------------------------------------------------- */

export const loadHandle = createAsyncThunk(
  "settings/loadHandle",
  async () => await window.cf.loadHandle()
);

/* -------------------------------------------------------------------------- */
/*                                   Hybrid                                   */
/* -------------------------------------------------------------------------- */

export const setAndStoreHandle = createAsyncThunk(
  "settings/setAndStoreHandle",
  async (handle: string, { dispatch }) => {
    dispatch(setHandle(handle));

    await dispatch(storeHandle(handle));
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Slices                                   */
/* -------------------------------------------------------------------------- */

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setHandle: (state, action: PayloadAction<string | null>) => {
      state.handle = action.payload;
    },
    setIsHandelValid: (state, action: PayloadAction<boolean>) => {
      state.isHandleValid = action.payload;
    },
    setIsHandleChanged: (state, action: PayloadAction<boolean>) => {
      state.isHandleChanged = action.payload;
    }
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

    builder.addCase(loadHandle.fulfilled, (state, action) => {
      state.loading.handle.load = Loading.SUCCEEDED;
      state.handle = action.payload;
    });

    builder.addCase(loadHandle.rejected, (state) => {
      state.loading.handle.load = Loading.FAILED;
    });

    /* -------------------------------------------------------------------------- */
    /*                                   Hybrid                                   */
    /* -------------------------------------------------------------------------- */
  }
});

export default settingsSlice.reducer;
export const { setHandle, setIsHandelValid, setIsHandleChanged } = settingsSlice.actions;
