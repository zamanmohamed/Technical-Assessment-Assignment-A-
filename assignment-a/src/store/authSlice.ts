import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";

const USERS_URL = `http://localhost:5000/api/auth`;

interface User {
  fullName: string;
  email: string;
  password?: string;
}

interface UsersState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export const signup = createAsyncThunk(
  "auth/register",
  async (userData: { fullName: string; email: string; password: string }) => {
    const response = await axios.post(`${USERS_URL}/register`, userData);
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${USERS_URL}/login`, credentials);
    return response.data;
  }
);

export const profile = createAsyncThunk("auth/profile", async () => {
  const { auth } = getState() as RootState;

  const response = await axios.get(`${USERS_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  return response.data;
});

// const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: "",
    status: "idle",
    error: null,
  } as UsersState,
  reducers: {
    resetAuthStatus(state) {
      (state.error = ""), (state.status = "idle");
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        const user = {
          fullName: action.payload.fullName,
          email: action.payload.email,
        };
        state.user = user;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const user = {
          fullName: action.payload.fullName,
          email: action.payload.email,
        };
        state.user = user;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const user = {
          fullName: action.payload.fullName,
          email: action.payload.email,
        };
        state.user = user;
      })
      .addCase(profile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getUser = (state: any) => state.auth.user;
export const getAuthStatus = (state: any) => state.auth.status;
export const getAuthError = (state: any) => state.auth.error;

export const { resetAuthStatus, logout } = authSlice.actions;

export default authSlice.reducer;
function getState(): RootState {
  throw new Error("Function not implemented.");
}
