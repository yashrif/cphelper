import { configureStore } from "@reduxjs/toolkit";
// import reduxLogger from "redux-logger";

import cfSlice from "./slices/cfSlice";
import preferencesSlice from "./slices/preferencesSlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    cf: cfSlice,
    ui: uiSlice,
    preferences: preferencesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
