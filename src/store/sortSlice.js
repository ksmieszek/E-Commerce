import { createSlice } from "@reduxjs/toolkit";

export const sortActions = {
  def: "Default order",
  priceAsc: "Price ascending",
  priceDesc: "Price descending",
  nameAsc: "Name A-Z",
  nameDesc: "Name Z-A",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortMethodKey: "def",
  },
  reducers: {
    changeSortKey: (state, { payload }) => {
      state.sortMethodKey = payload;
    },
  },
});

export const { changeSortKey } = sortSlice.actions;

export default sortSlice.reducer;
