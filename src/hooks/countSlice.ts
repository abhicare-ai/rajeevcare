import { createSlice } from "@reduxjs/toolkit";

export interface CountState {
  count: number;
  count2: number;
}

const initialState: CountState = {
  count: 0,
  count2: 0,
};

export const countSlice = createSlice({
  name: "appt count",
  initialState,
  reducers: {
    countHandler: (state, actions) => {
      const { count, count2 } = actions.payload;
      state.count = count;
      state.count2 = count2;
      state.count = count;
      state.count2 = count2;
    },
  },
});

export const { countHandler } = countSlice.actions;

export default countSlice.reducer;
