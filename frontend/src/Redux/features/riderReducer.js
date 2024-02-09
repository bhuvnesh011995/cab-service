import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
import { status } from "./deleteModalReducer";

const initialState = {
  selectedRider: null,
  riders: [],
  error: null,
  status: "idle",
};

export const addRiderReducer = createAsyncThunk(
  "riders/addRider",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/riders/addRider";
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
  }
);

export const getAllRiders = createAsyncThunk(
  "riders/getAllRiders",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/riders/getAllRiders";
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
  }
);

export const deleteRiderReducer = createAsyncThunk(
  "riders/deleteRider",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/riders/deleteRider/" + id;
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
  }
);

export const getSelectedRiderReducer = createAsyncThunk(
  "riders/getSelectedRider",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/riders/getSelectedRider/" + id;
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
  }
);

export const fetchRiders = createAsyncThunk(
  "riders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/riders";
      let response = await axios.get(url);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response?.data?.message || "error while fetching riders",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while fetching riders",
      });
    }
  }
);
const riderReducerSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {
    emptySelectedReducer: (state, action) => {
      state.selectedRider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRiderReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addRiderReducer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const filteredRider = state.riders.filter(
          (item) => item?._id == action.payload._id
        );
        if (filteredRider.length) {
          if (filteredRider[0]._id) {
            state.riders.map((rider, index) => {
              if (rider._id == filteredRider[0]._id) {
                state.riders[index] = action.payload;
              }
            });
          }
        } else {
          state.riders.push(action.payload);
        }
      })
      .addCase(addRiderReducer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(getAllRiders.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllRiders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.riders = action.payload;
      })
      .addCase(getAllRiders.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    builder
      .addCase(deleteRiderReducer.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteRiderReducer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.riders = state.riders.filter((e) => e._id !== action.payload.id);
      })
      .addCase(deleteRiderReducer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    builder
      .addCase(getSelectedRiderReducer.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getSelectedRiderReducer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRider = action.payload;
      })
      .addCase(getSelectedRiderReducer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    builder.addCase(fetchRiders.fulfilled, (state, action) => {
      state.riders = action.payload;
      state.status = "fetched";
    });
    builder.addCase(fetchRiders.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchRiders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching riders",
      };
    });
  },
});

export const getSelectedRider = (state) => state.rider.selectedRider;
export const getRiders = (state) => state.rider.riders;

export const { emptySelectedReducer } = riderReducerSlice.actions;

export default riderReducerSlice.reducer;
