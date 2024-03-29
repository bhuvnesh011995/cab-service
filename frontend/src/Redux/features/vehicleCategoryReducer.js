import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  vehicleCategory: [],
  message: "",
  selectVehicleCategory: null,
  viewVehicleCategory: null,
};

export const addVehicleCategory = createAsyncThunk(
  "vehicleCategory/addVehicleCategory",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      let response = await axios.post(BASE_URL + "/vehicleCategory", data);
      if (response.status === 201 && response.data.success)
        return response.data;
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
const fetchVehicleCategory = createAsyncThunk(
  "vehicleCategory/fetchVehicleCategory",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/vehicleCategory/");
      if (response.status === 200) return response.data;
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

const updateVehicleCategory = createAsyncThunk(
  "vehicleCategory/updateVehicleCategory",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      let response = await axios.put(
        BASE_URL + "/vehicleCategory/" + data.id,
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

export const deleteVehicleCategory = createAsyncThunk(
  "vehicleCategory/deleteVehicleCategory",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/vehicleCategory/" + id);
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

export const filterVehicleCategory = createAsyncThunk(
  "vehicleCategory/filterVehicleCategory",
  async ({ vehicleCategory, status } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/vehicleCategory/filter", BASE_URL);
      if (vehicleCategory)
        url.searchParams.set("vehicleCategory", vehicleCategory);
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

const vehicleCategorySlice = createSlice({
  name: "vehicleCategory",
  initialState,
  reducers: {
    setSucceessStatus: (state, action) => {
      state.status = "success";
    },
    updateVehicleCategoryById: (state, action) => {
      state.selectVehicleCategory = state.vehicleCategory.find(
        (selectVehicleCategory) =>
          selectVehicleCategory._id === action.payload.id
      );
      state.status = "fetched";
    },
    getViewVehicleCategory: (state, action) => {
      state.viewVehicleCategory = state.vehicleCategory.find(
        (viewVehicleCategory) => viewVehicleCategory._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewVehicleCategory: (state, action) => {
      state.viewVehicleCategory = null;
    },
    cleanVehicleCategory: (state, action) => {
      state.selectVehicleCategory = null;
    },
    cleanVehicleCategoryStatus: (state, action) => {
      state.status = "OK";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addVehicleCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addVehicleCategory.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.vehicleCategory = state.vehicleCategory.concat(
        action.payload.vehicleCategory
      );
      state.message = action.payload.message;
    });
    builder.addCase(addVehicleCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchVehicleCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchVehicleCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.vehicleCategory = action.payload.vehicleCategory;
    });
    builder.addCase(fetchVehicleCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.vehicleCategory;
    });
    builder.addCase(updateVehicleCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateVehicleCategory.fulfilled, (state, action) => {
      state.status = "update";
      state.vehicleCategory = state.vehicleCategory.map((item) =>
        item._id === action.payload.vehicleCategory._id
          ? action.payload.vehicleCategory
          : item
      );
      state.error = null;
    });
    builder.addCase(updateVehicleCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteVehicleCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteVehicleCategory.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.vehicleCategory = state.vehicleCategory.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteVehicleCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(filterVehicleCategory.fulfilled, (state, action) => {
      state.status = "filtered";
      state.vehicleCategory = action.payload;
    });
    builder.addCase(filterVehicleCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterVehicleCategory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});
const getAllVehicleCategory = (state) => state.vehicleCategory.vehicleCategory;

export { getAllVehicleCategory, fetchVehicleCategory, updateVehicleCategory };

export default vehicleCategorySlice.reducer;
export const {
  updateVehicleCategoryById,
  cleanVehicleCategory,
  cleanVehicleCategoryStatus,
  getViewVehicleCategory,
  cleanViewVehicleCategory,
} = vehicleCategorySlice.actions;
export const getVehicleCategory = (state) =>
  state.vehicleCategory.selectVehicleCategory;
export const getAllViewVehicleCategory = (state) =>
  state.vehicleCategory.viewVehicleCategory;
