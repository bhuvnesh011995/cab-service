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

export const filterDriverPayout = createAsyncThunk(
  "driverPayout/filter",
  async ({ totalDistance, taxFare }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/tax/filter", BASE_URL);
      if (totalDistance) url.searchParams.set("totalDistance", totalDistance);
      if (taxFare) url.searchParams.set("taxFare", taxFare);
      let response = await axios.get(url.href);

      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while fetching taxes",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error?.response?.data?.message || "error while fetching taxes",
      });
    }
  }
);

const addDriverPayout = createAsyncThunk(
  "driverPayout/addDriverPayout",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/driverPayout", data);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: response.status || "error",
          message: response.data.message || "Something went wrong !",
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status || "error",
        message: error.response.data.message || "Something went wrong !",
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
          status: response.status || "error",
          message: response.message || "Something went wrong !",
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status || "error",
        message: error.response.message || "Something went wrong !",
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
          status: response.status || "error",
          message: response.message || "Something went wrong !",
        });
    } catch (error) {
      rejectWithValue({
        status: error.response.status || "error",
        message: error.response.message || "Something went wrong !",
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
    builder.addCase(filterDriverPayout.fulfilled, (state, action) => {
      state.driverPayout = action.payload;
      state.status = "filtered";
      state.error = null;
    });
    builder.addCase(filterDriverPayout.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterDriverPayout.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching",
      };
    });

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
