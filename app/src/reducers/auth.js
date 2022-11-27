import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "utils/http";
import * as tokenServices from "services/token";
import * as authServices from "services/auth";

const initialState = {
  loading: false,
  user: null,
};

// Thunk functions
export const checkLoginStatus = createAsyncThunk(
  "auth/checkLoginStatus",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await http.get("/checkTokenValidity");
      return response.data;
    } catch {
      thunkAPI.dispatch(refreshToken());
    }
  }
);

export const logIn = createAsyncThunk("auth/logIn", async (payload) => {
  const response = await authServices.logIn(payload);
  return response;
});

export const signUp = createAsyncThunk("auth/signUp", async (payload) => {
  const response = await authServices.signUp(payload);
  return response;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const { refreshToken } = tokenServices.getTokens();
  const response = await authServices.renewToken(refreshToken);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // validate access token
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = 'in-progress';
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = 'idle';
          state.user = action.payload;
        }
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = 'idle';
        const { user, tokens } = action.payload;
        state.user = user;
        tokenServices.saveTokens(tokens);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = 're-direct';
        state.user = null;
      })
      // logIn
      .addCase(logIn.pending, (state) => {
        state.loading = 'in-progress';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = 'idle';
        const { user, tokens } = action.payload;
        state.user = user;
        tokenServices.saveTokens(tokens);
      })
      .addCase(logIn.rejected, (state) => {
        state.loading = 'idle';
        state.user = null;
      })
      // logIn
      .addCase(signUp.pending, (state) => {
        state.loading = 'in-progress';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = 'idle';
        const { user, tokens } = action.payload;
        state.user = user;
        tokenServices.saveTokens(tokens);
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = 'idle';
        state.user = null;
      });
  },
});

export default authSlice.reducer;
