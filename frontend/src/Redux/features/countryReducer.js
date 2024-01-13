import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import { fetchManufacturer } from "./ManufacturerReducer";
let initialState = {
  countries: [],
  status: "idle",
  error: null,
};
export const fetchContries = createAsyncThunk(
  "countries/fetchContries",
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
    builder.addCase(fetchContries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.countries = action.payload;
      state.error = null;
    });
    builder.addCase(fetchContries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchContries.rejected, (state, action) => {
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
