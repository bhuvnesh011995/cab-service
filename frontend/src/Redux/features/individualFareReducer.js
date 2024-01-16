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
    const url = BASE_URL + "/fare/getSelectedFare/" + data;
    const response = await axios.get(url);
    if (response.status == 200) {
      return response.data;
    } else
      return rejectWithValue({
        status: response.status,
        message: response.data.message,
      });
  },
);

export const postFare = createAsyncThunk(
  "fare/addFare",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      let response = await axios.post(BASE_URL + "/fare/addFare", data);
      return;
      if (response.status === 201 && response.data.success)
        return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  },
);

export const fetchAllFares = createAsyncThunk(
  "fare/fetchAllFares",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/fare/fetchAllFares");
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);
export const deleteFare = createAsyncThunk(
  "fare/deleteFare",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/fare/deleteFare/" + id);
      if (response.status === 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.data.message,
      });
    }
  },
);
const putFare = createAsyncThunk(
  "fare/putFare",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        BASE_URL + "/fare/putFare/" + data.id,
        data.newData,
      );
      if (response.status === 200 && response.data.success) {
        return response.data;
      } else
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
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
  },

  extraReducers(builder) {
    builder.addCase(postFare.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(postFare.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.fares = state.fares.concat(action.payload.make);
      state.message = action.payload.message;
    });
    builder.addCase(fetchAllFares.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllFares.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.fares = action.payload.makeList;
    });
    builder.addCase(fetchAllFares.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(putFare.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(putFare.fulfilled, (state, action) => {
      state.status = "updated";
      state.error = null;
      state.fares = state.fares.map((item) =>
        item._id === action.payload.data._id ? action.payload.data : item,
      );
    });
    builder.addCase(putFare.rejected, (state, action) => {
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
export default fareSlice.reducer;
export { putFare };
