import { configureStore } from "@reduxjs/toolkit";
// import reduxLogger from "redux-logger";

import cfSlice from "./slices/cfSlice";
import preferencesSlice from "./slices/preferencesSlice";
import componentSlice from "./slices/utilsSlice";

export const store = configureStore({
  reducer: {
    cf: cfSlice,
    component: componentSlice,
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
