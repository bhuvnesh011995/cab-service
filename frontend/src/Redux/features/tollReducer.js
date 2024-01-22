import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  error: null,
  status: "Idle",
  tolls: [],
  selectedToll: null,
};

export const addTollReducer = createAsyncThunk(
  "tolls/addToll",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/tolls/addToll";
      const response = await axios.post(url, data);
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.status,
        message: err.response.data.message,
      });
    }
  },
);

export const getAllTollReducer = createAsyncThunk(
  "tolls/getAllTolls",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/tolls/getAllTolls";
      const response = await axios.get(url, { params: data });
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.status,
        message: err.response.data.message,
      });
    }
  },
);

export const getSelectedTollReducer = createAsyncThunk(
  "tolls/getSelectedToll",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/tolls/getSelectedToll/" + id;
      const response = await axios.get(url);
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.status,
        message: err.response.data.message,
      });
    }
  },
);

export const deleteTollReducer = createAsyncThunk(
  "tolls/deleteToll",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/tolls/deleteToll/" + id;
      const response = await axios.delete(url);
      if (response.status == 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (err) {
      return rejectWithValue({
        status: err.status,
        message: err.response.data.message,
      });
    }
  },
);

const tollSlice = createSlice({
  name: "toll",
  initialState,
  reducers: {
    emptySelectedToll: (state, action) => {
      state.selectedToll = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTollReducer.pending, (state, action) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(addTollReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      const filteredToll = state.tolls.filter(
        (toll) => toll._id == action.payload._id,
      );
      if (filteredToll.length) {
        state.tolls.map((toll, tollIndex) => {
          if (toll._id == filteredToll[0]._id) {
            state.tolls[tollIndex] = action.payload;
          }
        });
      } else {
        state.tolls.push(action.payload);
      }
    });
    builder.addCase(addTollReducer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(getAllTollReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getAllTollReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tolls = action.payload;
    });
    builder.addCase(getAllTollReducer.rejected, (state, action) => {
      state.status = "error";
      state.status = action.payload;
    });
    builder.addCase(getSelectedTollReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getSelectedTollReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedToll = action.payload;
    });
    builder.addCase(getSelectedTollReducer.rejected, (state, action) => {
      state.status = "error";
      state.status = action.payload;
    });
    builder.addCase(deleteTollReducer.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(deleteTollReducer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tolls = state.tolls.filter((toll) => toll._id != action.payload.id);
    });
    builder.addCase(deleteTollReducer.rejected, (state, action) => {
      state.status = "error";
      state.status = action.payload;
    });
  },
});

export const getSelectedToll = (state) => state.toll.selectedToll;
export const getAllTolls = (state) => state.toll.tolls;

export const { emptySelectedToll } = tollSlice.actions;

export default tollSlice.reducer;
