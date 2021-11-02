import { createSlice } from "@reduxjs/toolkit";

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    userId: "",
    // displayName: "",
    // email: "",
  },
  reducers: {
    saveUser: (state, { payload }) => {
      const {
        uid,
        // displayName,
        // email,
      } = payload;
      state.userId = uid || "";
      // state.displayName = displayName || "";
      // state.email = email || "";
    },
  },
});

export const { saveUser } = authUserSlice.actions;

export default authUserSlice.reducer;
