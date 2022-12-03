import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingUser(state) {
      state.loading = true;
    },
    resetLoggedInUser(state) {
      state.user = null;
      state.loading = false;
    },
    setLoggedInUser(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const { setLoggedInUser, resetLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
