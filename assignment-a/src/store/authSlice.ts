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
  token: any;
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

let token: any = null;

if (typeof window !== "undefined") {
  const tokenString = localStorage.getItem("token");
  token = tokenString ? JSON.parse(tokenString) : null;
  if (token) {
    token = {
      fullName: token.fullName,
      email: token.email,
    };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: token,
    accessToken: "",
    status: "idle",
    error: null,
    token: token,
  } as UsersState,
  reducers: {
    resetAuthStatus(state) {
      (state.error = ""), (state.status = "idle");
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      localStorage.removeItem("token");
      state.token = null;
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
        state.token = localStorage.setItem(
          "token",
          JSON.stringify(action.payload)
        );
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
        state.token = localStorage.setItem(
          "token",
          JSON.stringify(action.payload)
        );
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
        state.token = localStorage.setItem(
          "token",
          JSON.stringify(action.payload)
        );
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
export const getToken = (state: any) => state.auth.token;

export const { resetAuthStatus, logout } = authSlice.actions;

export default authSlice.reducer;
function getState(): RootState {
  throw new Error("Function not implemented.");
}
