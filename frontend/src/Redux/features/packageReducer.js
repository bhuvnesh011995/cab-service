import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  status: "Idle",
  error: null,
  packages: [],
  selectedPackage: null,
};

export const addPackageReducer = createAsyncThunk(
  "package/addPackage",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/packages/addPackage";
      const response = await axios.post(url, data);
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
);

export const getAllPackages = createAsyncThunk(
  "package/getAllPackages",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/packages/getAllPackages";
      const response = await axios.get(url, { params: data });
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
);

export const deletePackageReducer = createAsyncThunk(
  "package/deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/packages/deletePackage/" + id;
      const response = await axios.delete(url);
      if (response.status == 200) return { ...response.data, id };
      else
        rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
);

export const getSelectedPackageReducer = createAsyncThunk(
  "package/getSelectedPackage",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/packages/getSelectedPackage/" + id;
      const response = await axios.get(url);
      if (response.status == 200) return response.data;
      else
        rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
);

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    emptySelectedPackage: (state, action) => {
      state.selectedPackage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPackageReducer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPackageReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      const filteredPackage = state.packages.filter(
        (item) => item?._id == action.payload._id,
      );
      if (filteredPackage.length) {
        if (filteredPackage[0]._id) {
          state.packages.map((fare, index) => {
            if (fare._id == filteredPackage[0]._id) {
              state.packages[index] = action.payload;
            }
          });
        }
      } else {
        state.packages.push(action.payload);
      }
    });
    builder.addCase(addPackageReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getAllPackages.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.packages = action.payload;
    });
    builder.addCase(getAllPackages.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deletePackageReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(deletePackageReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.packages = state.packages.filter(
        (e) => e._id !== action.payload.id,
      );
    });
    builder.addCase(deletePackageReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getSelectedPackageReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getSelectedPackageReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedPackage = action.payload;
    });
    builder.addCase(getSelectedPackageReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const status = (state) => state.package.status;
export const getPackages = (state) => state.package.packages;
export const getSelectedPackage = (state) => state.package.selectedPackage;
export const { emptySelectedPackage } = packageSlice.actions;
export default packageSlice.reducer;
