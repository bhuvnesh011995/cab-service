import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  admins: [],
  status: "idle",
  error: null,
};
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/admins");
      if (response.status === 200) return response.data;
      else
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
  }
);

export const addAdmin = createAsyncThunk(
  "admins/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      let response = axios.post(BASE_URL + "/auth/signUp", adminData);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: (await response).status,
          data: response.data,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAdmins.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.admins = state.admins.concat(action.payload);
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addAdmin.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.admins.push(action.payload);
    });
    builder.addCase(addAdmin.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
  },
});

export default adminsSlice.reducer;

export const getAllAdmins = (state) => state.admins.admins;

export const adminsById = (state, id) =>
  state.admins.admins.find((admin) => admin._id === id);
