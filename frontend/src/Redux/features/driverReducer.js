import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
import moment from "moment";

let initialState = {
  status: "idle",
  error: null,
  drivers: [],
  selectedDriver: null,
};

export const getSelectedDriverData = createAsyncThunk(
  "driver/getSelectedDriver",
  async (data, { rejectWithValue }) => {
    const url = BASE_URL + "/drivers/getSelectedDriver/" + data;
    const response = await axios.get(url);
    if (response.status == 200) {
      return response.data;
    } else
      return rejectWithValue({
        status: response.status,
        message: response.data.message,
      });
  }
);

export const postDriver = createAsyncThunk(
  "driver/addDriver",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/drivers/addDriver", data);
      if (response.status === 200) return response.data;
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

export const fetchAllDrivers = createAsyncThunk(
  "driver/fetchAllDrivers",
  async (filters, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/drivers/fetchAllDrivers";
      let response = await axios.get(url, { params: filters });
      if (response.status === 200) return response.data.drivers;
      else
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);
export const deleteDriver = createAsyncThunk(
  "driver/deleteDriver",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(
        BASE_URL + "/drivers/deleteDriver/" + id
      );
      if (response.status === 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.data.message,
      });
    }
  }
);

export const fetchAllDriver = createAsyncThunk(
  "/drivers/fetchAllDriver",
  async (_, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/drivers";
      let response = await axios.get(url);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response?.data?.message || "error while fethcing drivers",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message || "error while fethcing drivers",
      });
    }
  }
);
const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setSucceessStatus: (state, action) => {
      state.status = "success";
    },
    emptySelectedDriver: (state, action) => {
      state.selectedDriver = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(postDriver.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(postDriver.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      const filteredDrivers = state.drivers.filter(
        (item) => item?._id == action.payload._id
      );
      if (filteredDrivers.length) {
        if (filteredDrivers[0]._id) {
          state.drivers.map((driver, index) => {
            if (driver._id == filteredDrivers[0]._id) {
              state.drivers[index] = action.payload;
            }
          });
        }
      } else {
        state.drivers.push(action.payload);
      }
    });
    builder.addCase(postDriver.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchAllDrivers.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllDrivers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.drivers = action.payload;
    });
    builder.addCase(fetchAllDrivers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteDriver.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteDriver.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.drivers = state.drivers.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteDriver.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(getSelectedDriverData.pending, (state, action) => {
      state.status = "pending";
      state.error = action.payload;
    });
    builder.addCase(getSelectedDriverData.fulfilled, (state, action) => {
      state.status = "updated";
      state.error = null;
      action.payload.DOB = moment(action.payload.DOB).format("YYYY-MM-DD");
      action.payload.license.expiryDate = moment(
        action.payload.license.expiryDate
      ).format("YYYY-MM-DD");
      state.selectedDriver = action.payload;
    });
    builder.addCase(getSelectedDriverData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchAllDriver.fulfilled, (state, action) => {
      state.drivers = action.payload;
      state.status = "fetched";
    });
    builder.addCase(fetchAllDriver.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllDriver.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching drivers",
      };
    });
  },
});

export const getAllDrivers = (state) => state.driver.drivers;
export const getSelectedDriver = (state) => state.driver.selectedDriver;
export const { emptySelectedDriver } = driverSlice.actions;
export default driverSlice.reducer;
