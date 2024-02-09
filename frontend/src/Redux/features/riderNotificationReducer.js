import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
const initialState = {
  notifications: [],
  status: "idle",
  error: null,
  notification: null,
};
export const filterRiderNotification = createAsyncThunk(
  "notification/rider/filter",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/notification/rider/filter", BASE_URL);
      if (from) url.searchParams.set("from", from);
      if (to) url.searchParams.set("to", to);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while filtering rider notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message,
      });
    }
  }
);

const riderNotificationSlice = createSlice({
  name: "riderNotification",
  initialState,
  reducers: {
    clearRiderNotificationStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterRiderNotification.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.status = "filtered";
    });
    builder.addCase(filterRiderNotification.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(filterRiderNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default riderNotificationSlice.reducer;

export const { clearRiderNotificationStatus } = riderNotificationSlice.actions;

export const getRiderNotifications = (state) =>
  state.riderNotifications.notifications;

export const getRiderNotificationStatus = (state) =>
  state.riderNotifications.status;

export const getRiderNotificationError = (state) =>
  state.riderNotifications.error;

export const getRiderNotification = (state) =>
  state.riderNotifications.notification;
