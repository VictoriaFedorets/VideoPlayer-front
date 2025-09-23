import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  confirmEmail,
  refresh,
  refreshSession,
  resetPassword,
  sendResetPasswordEmail,
} from "./userOperations";

export interface UserDataProps {
  id: string;
  name: string;
  email: string;
}

export interface UserStateProps {
  user: UserDataProps | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserStateProps = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- logout.fulfilled ---
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "succeeded";
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });

    // --- confirmEmail.fulfilled ---
    builder.addCase(confirmEmail.fulfilled, (state) => {
      state.status = "succeeded";
    });

    // --- resetPassword.fulfilled ---
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.status = "succeeded";
    });

    // --- sendResetPasswordEmail.fulfilled ---
    builder.addCase(sendResetPasswordEmail.fulfilled, (state) => {
      state.status = "succeeded";
    });

    // --- pending (общий)---
    builder.addMatcher(
      isAnyOf(
        register.pending,
        login.pending,
        logout.pending,
        refresh.pending,
        refreshSession.pending,
        confirmEmail.pending,
        resetPassword.pending,
        sendResetPasswordEmail.pending
      ),
      (state) => {
        state.status = "loading";
        state.error = null;
      }
    );

    // --- fulfilled (общий)---
    builder.addMatcher(
      isAnyOf(
        register.fulfilled,
        login.fulfilled,
        refresh.fulfilled,
        refreshSession.fulfilled
      ),
      (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
      }
    );

    // --- rejected (общий) ---
    builder.addMatcher(
      isAnyOf(
        register.rejected,
        login.rejected,
        logout.rejected,
        refresh.rejected,
        refreshSession.rejected,
        confirmEmail.rejected,
        resetPassword.rejected,
        sendResetPasswordEmail.rejected
      ),
      (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      }
    );
  },
});

export default userSlice.reducer;
