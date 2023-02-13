import { configureStore } from "@reduxjs/toolkit";
// import reduxLogger from "redux-logger";

import cfSlice from "./cfSlice";

export const store = configureStore({
  reducer: {
    cf: cfSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
