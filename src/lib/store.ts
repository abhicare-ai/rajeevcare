import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/hooks/authslice";
import countSlice from "@/hooks/countSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice,
      countSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
