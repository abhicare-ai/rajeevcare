import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/hooks/authslice";
import countSlice from "@/hooks/countSlice";
import  publicAuthSlice  from "@/hooks/publicAuthSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice,
      countSlice,
      publicAuthSlice
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
