import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

let initialState = {
  user: {},
  token: "",
  message: {},
  status: "idle",
  permissions: [],
  error: "null",
};
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/auth/signIn";
      let response = await axios.post(url, data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      } else return rejectWithValue({ message: response.data.message });
    } catch (error) {
      console.log(error);
      rejectWithValue({ message: error.response.data.message });
    }
  }
);

export const loggedUser = createAsyncThunk(
  "auth/loggedUser",
  async (data, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");

      if (!token) return rejectWithValue({ status: "noToken" });
      let url = BASE_URL + "/auth/loggedUser";
      let response = await axios.get(url, {
        headers: { "x-access-token": token },
      });
      console.log(response.data);
      if (response.status === 200 && response.data.success) {
        return response.data;
      } else {
        localStorage.removeItem("token");
        rejectWithValue({ status: "error" });
      }
    } catch (error) {
      const { response } = error;
      if (response.status === 401) {
        localStorage.removeItem("token");
        return rejectWithValue({
          status: "error",
          message: response.data.message,
        });
      } else if (response.status === 500)
        return rejectWithValue({
          status: "error",
          message: response.data.message,
        });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      let {
        payload: { name, email, username, token, permissions },
      } = action;
      localStorage.setItem("token", token);
      state.status = "succeeded";
      state.token = token;
      state.user = { name, email, username };
      state.permissions = permissions;
      state.error = null;
    });
    builder.addCase(login.pending, (state, action) => {
      state = { ...initialState, status: "loading" };
    });
    builder.addCase(login.rejected, (state, action) => {
      let { payload } = action;
      state.error = { message: payload.message };
      state.status = "error";
    });
    builder.addCase(loggedUser.fulfilled, (state, action) => {
      let {
        payload: { name, email, username, token, permissions },
      } = action;
      state.status = "success";
      state.user = { name, email, username };
      state.error = null;
      state.permissions = permissions;
      state.token = token;
    });
    builder.addCase(loggedUser.rejected, (state, action) => {
      let { payload } = action;
      if (payload.status === "noToken")
        return { ...initialState, status: "login" };
      else if (payload.status === "error")
        state = {
          ...initialState,
          error: { message: payload.message || "SOME ERROR OCCURED" },
          status: "error",
        };
    });
    builder.addCase(loggedUser.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const getToken = (state) => state.auth.token;
export const getPermissions = (state) => state.auth.permissions;
export const getUser = (state) => state.auth.user;
export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;
