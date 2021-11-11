import { createSlice } from "@reduxjs/toolkit";
import { ReactComponent as small } from "assets/icons/grid-small.svg";
import { ReactComponent as medium } from "assets/icons/grid-medium.svg";
import { ReactComponent as big } from "assets/icons/grid-big.svg";

export const gridValues = [
  { styles: "grid-template-columns-2", icon: small, size: "big" },
  { styles: "grid-template-columns-3", icon: medium, size: "medium" },
  { styles: "grid-template-columns-4", icon: big, size: "small" },
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
