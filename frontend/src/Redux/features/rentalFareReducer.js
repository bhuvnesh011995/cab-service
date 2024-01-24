import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  status: "Idle",
  error: null,
  rentals: [],
  selectedRental: null,
};

export const addRentalReducer = createAsyncThunk(
  "rentalFare/addRental",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/rentals/addRental";
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

export const getAllRentals = createAsyncThunk(
  "rentalFare/getAllRentals",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/rentals/getAllRentals";
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

export const deleteRentalReducer = createAsyncThunk(
  "rentalFare/deleteRental",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/rentals/deleteRental/" + id;
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

export const getSelectedRentalReducer = createAsyncThunk(
  "rentalFare/getSelectedRental",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/rentals/getSelectedRental/" + id;
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

const rentalSlice = createSlice({
  name: "rentalFare",
  initialState,
  reducers: {
    emptySelectedRental: (state, action) => {
      state.selectedRental = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRentalReducer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addRentalReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      const filteredRental = state.rentals.filter(
        (item) => item?._id == action.payload._id,
      );
      if (filteredRental.length) {
        if (filteredRental[0]._id) {
          state.rentals.map((fare, index) => {
            if (fare._id == filteredRental[0]._id) {
              state.rentals[index] = action.payload;
            }
          });
        }
      } else {
        state.rentals.push(action.payload);
      }
    });
    builder.addCase(addRentalReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getAllRentals.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllRentals.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.rentals = action.payload;
    });
    builder.addCase(getAllRentals.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteRentalReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(deleteRentalReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rentals = state.rentals.filter((e) => e._id !== action.payload.id);
    });
    builder.addCase(deleteRentalReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getSelectedRentalReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getSelectedRentalReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedRental = action.payload;
    });
    builder.addCase(getSelectedRentalReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const status = (state) => state.rentalFare.status;
export const getRentals = (state) => state.rentalFare.rentals;
export const getSelectedRental = (state) => state.rentalFare.selectedRental;
export const { emptySelectedRental } = rentalSlice.actions;
export default rentalSlice.reducer;
