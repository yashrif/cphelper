import { configureStore } from "@reduxjs/toolkit";
// import reduxLogger from "redux-logger";

import cfSlice from "./slices/cfSlice";
import preferencesSlice from "./slices/settingsSlice";
import componentSlice from "./slices/utilsSlice";

export const store = configureStore({
  reducer: {
    cf: cfSlice,
    utils: componentSlice,
    settings: preferencesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
