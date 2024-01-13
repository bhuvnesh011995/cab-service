import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import { fetchManufacturer } from "./ManufacturerReducer";
let initialState = {
  states: [],
  status: "idle",
  error: null,
};
export const fetchStates = createAsyncThunk(
  "states/fetchStates",
  async (countryId, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/state/" + countryId);
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

const stateSlice = createSlice({
  name: "states",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStates.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.states = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStates.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchStates.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });
  },
});

export default stateSlice.reducer;

export const status = (state) => state.states.status;

export const countryById = (state, id) => {
  return state.states.states.find((country) => country._id === id);
};
