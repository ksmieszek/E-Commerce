import { createSlice } from "@reduxjs/toolkit";

export const gridValues = [
  { styles: "grid-template-columns-2", image: "g2", size: "big" },
  { styles: "grid-template-columns-3", image: "g3", size: "medium" },
  { styles: "grid-template-columns-4", image: "g4", size: "small" },
];

export const gridSlice = createSlice({
  name: "grid",
  initialState: {
    gridClass: "",
  },
  reducers: {
    setGridClass: (state, { payload }) => {
      state.gridClass = payload;
    },
  },
});

export const { setGridClass } = gridSlice.actions;

export default gridSlice.reducer;
