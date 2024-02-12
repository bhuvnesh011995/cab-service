import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
const initialState = {
  notifications: [],
  status: "idle",
  error: null,
  notification: null,
};

export const addRiderNotification = createAsyncThunk(
  "notification/rider/add",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/notification/rider";
      let response = await axios.post(url, data);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message || "error while adding rider notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while adding rider notification",
      });
    }
  }
);
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

export const updateRiderNotification = createAsyncThunk(
  "notification/rider/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/notification/rider/" + id;
      let response = await axios.put(url, data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while updating rider notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while updaing rider notification",
      });
    }
  }
);

export const deleteRiderNotification = createAsyncThunk(
  "notification/rider/delete",
  async ({ id, url }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while deleting rider notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while deleting rider notification",
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

    dataToUpdateRiderNotification: (state, action) => {
      let obj;

      for (let item of state.notifications) {
        if (item._id === action.payload.id) {
          obj = { ...item };
          obj.forUsers = obj.forUsers.map((user) => ({
            value: user._id,
            label: user.name,
          }));
          break;
        }
      }
      state.notification = obj;
    },
    clearUpdateData: (state, action) => {
      state.notification = null;
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

    builder.addCase(addRiderNotification.fulfilled, (state, action) => {
      state.notifications.push(action.payload);
      state.status = "added";
    });
    builder.addCase(addRiderNotification.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addRiderNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while adding rider notification",
      };
    });

    builder.addCase(updateRiderNotification.fulfilled, (state, action) => {
      console.log(action.payload);
      state.notifications = state.notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
      state.status = "updated";
    });
    builder.addCase(updateRiderNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateRiderNotification.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(deleteRiderNotification.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteRiderNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteRiderNotification.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default riderNotificationSlice.reducer;

export const {
  clearRiderNotificationStatus,
  dataToUpdateRiderNotification,
  clearUpdateData,
} = riderNotificationSlice.actions;

export const getRiderNotifications = (state) =>
  state.riderNotifications.notifications;

export const getRiderNotificationStatus = (state) =>
  state.riderNotifications.status;

export const getRiderNotificationError = (state) =>
  state.riderNotifications.error;

export const getRiderNotification = (state) =>
  state.riderNotifications.notification;
