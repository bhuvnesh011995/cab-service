import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  fares: [],
  message: "",
  selectedFare: null,
};

export const getSelectedFareData = createAsyncThunk(
  "fare/getSelectedFare",
  async (data, { rejectWithValue }) => {
    const url = BASE_URL + "/fares/getSelectedFare/" + data;
    const response = await axios.get(url);
    if (response.status == 200) {
      return response.data;
    } else
      return rejectWithValue({
        status: response.status || "error",
        message: response.data.message || "Something went wrong !",
      });
  },
);

export const postFare = createAsyncThunk(
  "fare/addFare",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/fares/addFare", data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: response.status || "error",
          message: response.data.message || "Something went wrong !",
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status || "error",
        message: error.response.data.message || "Something went wrong !",
      });
    }
  },
);

export const fetchAllFares = createAsyncThunk(
  "fare/fetchAllFares",
  async (filters, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/fares/fetchAllFares";
      let response = await axios.get(url, { params: filters });
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: response.status || "error",
          data: response.data || "Something went wrong !",
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status || "error",
        data: error.response.data || "Something went wrong !",
      });
    }
  },
);
export const deleteFare = createAsyncThunk(
  "fare/deleteFare",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/fares/deleteFare/" + id);
      if (response.status === 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status || "error",
          message: response.data.message || "Something went wrong !",
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status || "error",
        message: error.data.message || "Something went wrong !",
      });
    }
  },
);

const fareSlice = createSlice({
  name: "fare",
  initialState,
  reducers: {
    setSucceessStatus: (state, action) => {
      state.status = "success";
    },
    emptySelectedFare: (state, action) => {
      state.selectedFare = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(postFare.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(postFare.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      const filteredFares = state.fares.filter(
        (item) => item?._id == action.payload[0]._id,
      );
      if (filteredFares.length) {
        if (filteredFares[0]._id) {
          state.fares.map((fare, index) => {
            if (fare._id == filteredFares[0]._id) {
              state.fares[index] = action.payload[0];
            }
          });
        }
      } else {
        state.fares.push(action.payload[0]);
      }
    });
    builder.addCase(postFare.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchAllFares.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllFares.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.fares = action.payload;
    });
    builder.addCase(fetchAllFares.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteFare.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteFare.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.fares = state.fares.filter(
        (item) => item._id !== action.payload.id,
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteFare.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(getSelectedFareData.pending, (state, action) => {
      state.status = "pending";
      state.error = action.payload;
    });
    builder.addCase(getSelectedFareData.fulfilled, (state, action) => {
      state.status = "updated";
      state.error = null;
      state.selectedFare = action.payload;
    });
    builder.addCase(getSelectedFareData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const allFares = (state) => state.fare.fares;
export const selectedFare = (state) => state.fare.selectedFare;
export const { emptySelectedFare } = fareSlice.actions;
export default fareSlice.reducer;
