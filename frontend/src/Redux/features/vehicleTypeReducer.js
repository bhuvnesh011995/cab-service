import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  vehicleType: [],
  selectVehicleType: null,
  viewVehicleType: null,
  message: "",
};

export const getVehicleTypes = createAsyncThunk(
  "vehicleType/getVehicleType",
  async (_, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/runMode/vehicleType/";
      let response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      } else
        return rejectWithValue({
          status: "error",
          message: "error while fetching vehicleTypes",
        });
    } catch (error) {
      console.log(error?.response);
      return rejectWithValue({
        status: "error",
        message: "error while fetching vehicleTypes",
      });
    }
  }
);

const addVehicleType = createAsyncThunk(
  "vehicleType/addVehicleType",
  async (data, { rejectWithValue }) => {
    try {
      if (data.file) data.file = data.file[0];
      const response = await axios.post(BASE_URL + "/vehicleType/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        return response.data;
      } else {
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const fetchVehicleType = createAsyncThunk(
  "vehicleType/fetchVehicleType",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/vehicleType/");
      if (response.status === 200) return response.data;
      else {
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const deleteVehicleType = createAsyncThunk(
  "vehicleType/deleteVehicleType",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/vehicleType/" + id);
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
const updateVehicleType = createAsyncThunk(
  "vehicleType/updateVehicleType",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      let response = await axios.put(
        BASE_URL + "/vehicleType/" + data.id,
        data.newData
      );
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

export const filterVehicleType = createAsyncThunk(
  "vehicleType/filterVehicleType",
  async ({ runMode, name, status } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/vehicleType/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (runMode) url.searchParams.set("runmode", runMode);
      if (status) url.searchParams.set("status", status);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          data: response?.data?.message,
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message || "error while fetching contry",
      });
    }
  }
);

const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState,
  reducers: {
    updateVehicleTypeById: (state, action) => {
      let obj = state.vehicleType.find(
        (selectVehicleType) => selectVehicleType._id === action.payload.id
      );
      state.status = "fetched";
      const runMode = obj.runMode.map((item) => ({
        value: item,
        label: item,
      }));
      state.selectVehicleType = { ...obj, runMode: runMode };
    },
    getViewVehicleType: (state, action) => {
      state.viewVehicleType = state.vehicleType.find(
        (viewVehicleType) => viewVehicleType._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewVehicleType: (state, action) => {
      state.viewVehicleType = null;
    },
    cleanSelectVehicleType: (state, action) => {
      state.selectVehicleType = null;
    },
    cleanVehicleTypeStatus: (state, action) => {
      state.model = "ok";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVehicleType.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addVehicleType.fulfilled, (state, action) => {
        state.status = "added";
        state.error = null;
        state.vehicleType.push(action.payload.vehicleType);
        state.message = action.payload.message;
      })
      .addCase(addVehicleType.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    builder
      .addCase(fetchVehicleType.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.vehicleType = action.payload.vehicleType;
      })
      .addCase(fetchVehicleType.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
        state.vehicleType = action.payload;
      });
    builder.addCase(deleteVehicleType.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteVehicleType.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.vehicleType = state.vehicleType.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteVehicleType.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateVehicleType.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateVehicleType.fulfilled, (state, action) => {
      state.status = "update";
      state.vehicleType = state.vehicleType.map((item) =>
        item._id === action.payload.vehicleType._id
          ? action.payload.vehicleType
          : item
      );
      state.error = null;
    });
    builder.addCase(updateVehicleType.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getVehicleTypes.fulfilled, (state, action) => {
      state.vehicleType = action.payload;
      state.error = null;
      state.status = "fetched";
    });
    builder.addCase(getVehicleTypes.rejected, (state, action) => {
      state.status = action.payload || {
        status: "error",
        message: "error while fetching vehcleType",
      };
    });
    builder.addCase(filterVehicleType.fulfilled, (state, action) => {
      state.status = "filtered";
      state.vehicleType = action.payload;
    });
    builder.addCase(filterVehicleType.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterVehicleType.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default vehicleTypeSlice.reducer;
const getAllVehicleType = (state) => state.vehicleType?.vehicleType;
export {
  addVehicleType,
  getAllVehicleType,
  fetchVehicleType,
  updateVehicleType,
};
export const {
  updateVehicleTypeById,
  cleanSelectVehicleType,
  cleanVehicleTypeStatus,
  viewVehicleType,
  getViewVehicleType,
  cleanViewVehicleType,
} = vehicleTypeSlice.actions;

export const getVehicleType = (state) => state.vehicleType.selectVehicleType;
export const getAllViewVehicleType = (state) =>
  state.vehicleType.viewVehicleType;
