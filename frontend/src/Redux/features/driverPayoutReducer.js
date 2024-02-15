import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  driverPayout: [],
  selectDriverPayout: null,
  viewDriverPayout: null,
};

const addDriverPayout = createAsyncThunk(
  "driverPayout/addDriverPayout",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/driverPayout", data);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const fetchDriverPayout = createAsyncThunk(
  "driverPayout/fetchDriverPayout",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/driverPayout");
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

const deleteDriverPayout = createAsyncThunk(
  "driver/deleteDriverPayout",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status,
          message: response.message,
        });
    } catch (error) {
      rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const updateDriverPayout = createAsyncThunk(
  "driverPayout/updateDriverPayout",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/driverPayout/" + data.id;
      let response = await axios.put(url, data.newData);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while updating tax",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while updating tax",
      });
    }
  }
);

const driverPayoutSlice = createSlice({
  name: "driverPayout",
  initialState,
  reducers: {
    updateDriverPayoutById: (state, action) => {
      state.selectDriverPayout = state.driverPayout.find(
        (selectDriverPayout) => selectDriverPayout._id === action.payload.id
      );
      state.status = "fetched";
    },
    getViewDriverPayout: (state, action) => {
      state.viewDriverPayout = state.driverPayout.find(
        (viewDriverPayout) => viewDriverPayout._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewDriverPayload: (state, action) => {
      state.viewDriverPayout = null;
    },

    cleanSelectDriverPayout: (state, action) => {
      state.selectDriverPayout = null;
    },

    cleanDriverPayout: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addDriverPayout.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addDriverPayout.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.driverPayout = (state.driverPayout || []).concat(action.payload);
    });
    builder.addCase(addDriverPayout.rejected, (state, action) => {
      state.status = "error";
      state.error = null;
      state.driverPayout = action.payload;
    });
    builder.addCase(fetchDriverPayout.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchDriverPayout.fulfilled, (state, action) => {
      state.status = "successed";
      state.error = null;
      state.driverPayout = action.payload;
    });
    builder.addCase(fetchDriverPayout.rejected, (state, action) => {
      state.status = "error";
      state.error = null;
      state.driverPayout = action.payload;
    });

    builder.addCase(deleteDriverPayout.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteDriverPayout.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;

      state.driverPayout = state.driverPayout.filter(
        (driverPayout) => driverPayout._id !== action.payload.id
      );
    });
    builder.addCase(deleteDriverPayout.rejected, (state, action) => {
      state.status = "error";
      state.error = null;
      state.driverPayout = action.payload;
    });
    builder.addCase(updateDriverPayout.fulfilled, (state, action) => {
      state.driverPayout = state.driverPayout.map((driverPayout) =>
        driverPayout._id === action.payload._id ? action.payload : driverPayout
      );
      state.status = "updated";
    });
    builder.addCase(updateDriverPayout.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateDriverPayout.pending, (state, action) => {
      state.status = "loading";
    });
  },
});
export default driverPayoutSlice.reducer;
export { addDriverPayout, fetchDriverPayout, deleteDriverPayout };
export const getAllDriverPayout = (state) => state.driverPayout.driverPayout;
export const getDriverPayout = (state) => state.driverPayout.selectDriverPayout;
export const getAllViewDriverPayout = (state) =>
  state.driverPayout.viewDriverPayout;

export const Status = (state) => state.driverPayout.status;

export const {
  cleanDriverPayout,
  updateDriverPayoutById,
  cleanSelectDriverPayout,
  getViewDriverPayout,
} = driverPayoutSlice.actions;
