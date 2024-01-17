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
      console.log(data);
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

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPackageReducer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPackageReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      const filteredPackage = state.packages.filter(
        (item) => item?._id == action.payload[0]._id,
      );
      if (filteredPackage.length) {
        if (filteredPackage[0]._id) {
          state.packages.map((fare, index) => {
            if (fare._id == filteredPackage[0]._id) {
              state.packages[index] = action.payload[0];
            }
          });
        }
      } else {
        state.packages.push(action.payload[0]);
      }
    });
    builder.addCase(addPackageReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const status = (state) => state.package.status;
export const getPackages = (state) => state.package.packages;
export const getSelectedPackage = (state) => state.package.selectedPackage;
export default packageSlice.reducer;
