import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  model: [],
  message: "",
};

export const addModel = createAsyncThunk(
  "model/addModel",
  async (data, { rejectWithValue }) => {  
    try {
      let response = await axios.post(BASE_URL + "/model", data);
      if (response.status === 201 && response.data.success) return response.data;
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
  }
);

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addModel.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addModel.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;

    });
    builder.addCase(addModel.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default modelSlice.reducer;
