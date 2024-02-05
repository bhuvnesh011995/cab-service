import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

let initialState = {
  setting: null,
  status: "idle",
  error: null,
};

export const fetchSetting = createAsyncThunk(
  "setting/fetch",
  async (_, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/settings";
      let response = await axios.get(url);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data.message || "error occured while fetching",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.response.data.message || "error occured while fetching",
      });
    }
  }
);

export const updateSetting = createAsyncThunk(
  "setting/updateSetting",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/setting";
      let response = await axios.put(url, data);

      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while updating",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.responsed?.data?.message || "error while updating",
      });
    }
  }
);
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    clearSettingStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      state.setting = action.payload;
      state.status = "fetched";
      state.error = null;
    });
    builder.addCase(fetchSetting.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchSetting.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error occured while fetching",
      };
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      state.setting = action.payload;
      state.status = "updated";
      state.error = null;
    });

    builder.addCase(updateSetting.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updating",
      };
    });
    builder.addCase(updateSetting.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
  },
});

export const { clearSettingStatus } = settingSlice.actions;

export default settingSlice.reducer;

export const getSettings = (state) => state.setting.setting;

export const settingStatus = (state) => state.setting.status;

export const settingError = (state) => state.setting.error;
