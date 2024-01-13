import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import { fetchManufacturer } from "./ManufacturerReducer";
import axios from "axios";
let initialState = {
  cities: [],
  status: "idle",
  error: null,
};
export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (stateId, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/cities/" + stateId);
      if (response.status === 200) {
        return response.data;
      } else
        return rejectWithValue({
          status: "error",
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message,
      });
    }
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    emptyCities: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cities = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCities.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });
  },
});

export default citySlice.reducer;

export const stateStatus = (state) => state.cities.status;

export const cityByid = (state, id) => {
  return state.cities.cities.find((city) => city._id === id);
};
export const getCities = (state) => state.cities.cities;

export const { emptyCities } = citySlice.actions;
