import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
let initialState = {
  countries: [],
  status: "idle",
  error: null,
};
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/country");
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

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.countries = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });
  },
});

export default countrySlice.reducer;

export const status = (state) => state.countries.status;

export const countryById = (state, id) => {
  return state.countries.countries.find((country) => country._id === id);
};

export const getCountries = (state) => state.countries.countries;
