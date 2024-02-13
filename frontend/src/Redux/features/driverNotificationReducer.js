import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
const initialState = {
  notifications: [],
  status: "idle",
  error: null,
  notification: null,
};

export const addDriverNotification = createAsyncThunk(
  "notification/driver/add",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/notification/driver";
      let response = await axios.post(url, data);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message || "error while adding driver notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while adding driver notification",
      });
    }
  }
);
export const filterDriverNotification = createAsyncThunk(
  "notification/driver/filter",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/notification/driver/filter", BASE_URL);
      if (from) url.searchParams.set("from", from);
      if (to) url.searchParams.set("to", to);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while filtering driver notification",
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

export const updateDriverNotification = createAsyncThunk(
  "notification/driver/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/notification/driver/" + id;
      let response = await axios.put(url, data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while updating driver notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while updaing driver notification",
      });
    }
  }
);

export const deleteDriverNotification = createAsyncThunk(
  "notification/driver/delete",
  async ({ id, url }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message ||
            "error while deleting driver notification",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message ||
          "error while deleting driver notification",
      });
    }
  }
);

const riderNotificationSlice = createSlice({
  name: "riderNotification",
  initialState,
  reducers: {
    clearDriverNotificationStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },

    dataToUpdateDriverNotification: (state, action) => {
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
    builder.addCase(filterDriverNotification.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.status = "filtered";
    });
    builder.addCase(filterDriverNotification.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(filterDriverNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(addDriverNotification.fulfilled, (state, action) => {
      state.notifications.push(action.payload);
      state.status = "added";
    });
    builder.addCase(addDriverNotification.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addDriverNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while adding driver notification",
      };
    });

    builder.addCase(updateDriverNotification.fulfilled, (state, action) => {
      console.log(action.payload);
      state.notifications = state.notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
      state.status = "updated";
    });
    builder.addCase(updateDriverNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateDriverNotification.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(deleteDriverNotification.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteDriverNotification.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteDriverNotification.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default riderNotificationSlice.reducer;

export const {
  clearDriverNotificationStatus,
  dataToUpdateDriverNotification,
  clearUpdateData,
} = riderNotificationSlice.actions;

export const getDriverNotifications = (state) =>
  state.driverNotifications.notifications;

export const getDriverNotificationStatus = (state) =>
  state.driverNotifications.status;

export const getDriverNotificationError = (state) =>
  state.driverNotifications.error;

export const getDriverNotification = (state) =>
  state.driverNotifications.notification;
