import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "@services/apiConfig";
import { toast } from "react-toastify";

interface UserRequestProps {
  name?: string;
  email: string;
  password: string;
}

export interface ResponseProps {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

interface ConfirmEmailRequest {
  token: string;
}

interface ConfirmEmailResponse {
  message: string;
}

// ---Registration---
export const register = createAsyncThunk<
  ResponseProps,
  UserRequestProps,
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ResponseProps>(
      "/auth/register",
      credentials
    );
    toast.success(
      "Registration is successful. Please confirm your email via your mailbox!"
    );
    return data;
  } catch (error: unknown) {
    let message = "Registration failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    toast.error(message);

    return thunkAPI.rejectWithValue(message);
  }
});

// Confirm Email
export const confirmEmail = createAsyncThunk<
  ConfirmEmailResponse,
  ConfirmEmailRequest,
  { rejectValue: string }
>("user/confirmEmail", async (credentials, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ConfirmEmailResponse>(
      "/auth/confirm-email",
      credentials
    );
    toast.success("Email confirmed!");
    return data;
  } catch (error: unknown) {
    let message = "Email has not been confirmed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Login
export const login = createAsyncThunk<
  ResponseProps,
  UserRequestProps,
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ResponseProps>(
      "/auth/login",
      credentials
    );
    toast.success("Login successful!");
    return data;
  } catch (error: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await authAPI.post("/auth/logout");
      toast.success("You are logged out.");
    } catch (error: unknown) {
      let message = "Logout failed";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Refresh
export const refresh = createAsyncThunk<
  ResponseProps,
  void,
  { rejectValue: string }
>("user/refresh", async (_, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ResponseProps>("/auth/refresh");
    return data;
  } catch (error: unknown) {
    let message = "Refresh failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// refreshSession
export const refreshSession = createAsyncThunk<
  ResponseProps,
  void,
  { rejectValue: string }
>("user/refreshSession", async (_, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ResponseProps>("/auth/refresh-session");
    return data;
  } catch (error: unknown) {
    let message = "Session refresh failed.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    return thunkAPI.rejectWithValue(message);
  }
});

// sendResetPasswordEmail
export const sendResetPasswordEmail = createAsyncThunk<
  ConfirmEmailResponse,
  Pick<UserRequestProps, "email">, // отправляем только email
  { rejectValue: string }
>("user/sendResetPasswordEmail", async (payload, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ConfirmEmailResponse>(
      "/auth/send-reset-email",
      payload
    );
    toast.success("Reset password email sent!");
    return data;
  } catch (error: unknown) {
    let message = "Failed to send reset email";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Reset Password
export const resetPassword = createAsyncThunk<
  ConfirmEmailResponse,
  { token: string; newPassword: string }, // payload запроса
  { rejectValue: string }
>("user/resetPassword", async (payload, thunkAPI) => {
  try {
    const { data } = await authAPI.post<ConfirmEmailResponse>(
      "/auth/reset-pwd",
      payload
    );
    toast.success("Password successfully reset!");
    return data;
  } catch (error: unknown) {
    let message = "Failed to reset password";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
