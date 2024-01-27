import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  smsTamplates: [],
  status: "idle",
  error: null,
  smsTamplate: null,
};

export const filterSmsTemplate = createAsyncThunk(
  "smsTemplate/filter",
  async ({ title, forUsers, status }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/template/sms/filter/", BASE_URL);

      if (title) url.searchParams.set("title", title);
      if (forUsers) url.searchParams.set("forUsers", forUsers);
      if (status) url.searchParams.set("status", status);

      let response = await axios.get(url.href);

      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: "error while fetching templates",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: "error while fetching templates",
      });
    }
  }
);

const smsTemplateSlice = createSlice({
  name: "smsTemplate",
  initialState,
  reducersL: {
    clearSmsTemplateStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterSmsTemplate.fulfilled, (state, action) => {
      state.tamplates = action.payload;
      state.status = "filtered";
      state.error = null;
    });

    builder.addCase(filterSmsTemplate.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching templete",
      };
    });

    builder.addCase(filterSmsTemplate.pending, (state, action) => {
      state.status = "loading";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching templete",
      };
    });
  },
});

export default smsTemplateSlice.reducer;

export const { clearSmsTemplateStatus } = smsTemplateSlice.actions;

export const smsTemplateStatus = (state) => state.smsTemplate.status;

export const getSmsTemplates = (state) => state.smsTemplate.tamplates;

export const getSmsTemplateError = (state) => state.smsTemplate.error;
