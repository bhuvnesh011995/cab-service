import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  tamplates: [],
  status: "idle",
  error: null,
  tamplate: null,
};

export const filterEmailTemplate = createAsyncThunk(
  "emailTemplate/filter",
  async ({ title, forUsers, status }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/template/email/filter/", BASE_URL);

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

const emailTemplateSlice = createSlice({
  name: "emailTemplate",
  initialState,
  reducersL: {
    clearEmailTemplateStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterEmailTemplate.fulfilled, (state, action) => {
      state.tamplates = action.payload;
      state.status = "filtered";
      state.error = null;
    });

    builder.addCase(filterEmailTemplate.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching templete",
      };
    });

    builder.addCase(filterEmailTemplate.pending, (state, action) => {
      state.status = "loading";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching templete",
      };
    });
  },
});

export default emailTemplateSlice.reducer;

export const { clearEmailTemplateStatus } = emailTemplateSlice.actions;

export const emailTemplateStatus = (state) => state.emailTemplate.status;

export const getEmailTemplates = (state) => state.emailTemplate.tamplates;

export const getEmailTemplateError = (state) => state.emailTemplate.error;
