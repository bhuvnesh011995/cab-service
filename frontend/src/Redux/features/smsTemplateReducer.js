import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";

const initialState = {
  smsTemplates: [],
  status: "idle",
  error: null,
  smsTemplate: null,
};

export const addSms = createAsyncThunk(
  "smsTemplate/addSms",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/template/sms/", data);
      console.log(response, "res");
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while adding sms templeate",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error.response?.data?.message || "error while adding sms templeate",
      });
    }
  }
);

export const updateSmsTemplate = createAsyncThunk(
  "smsTemplate/updateSms",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let response = await axios.put(BASE_URL + "/template/sms/" + id, data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response?.data?.message || "error while updating sms template",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error.response?.data?.message || "error while updating sms template",
      });
    }
  }
);
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

export const deleteSmsTemplate = createAsyncThunk(
  "smsTemplate/deleteSmsTemplate",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data.message ?? "error while deleting sms template",
        });
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue({
        status: "error",
        message:
          error.response.data.message ?? "error while deleting sms template",
      });
    }
  }
);

const smsTemplateSlice = createSlice({
  name: "smsTemplate",
  initialState,
  reducers: {
    clearSmsTemplateStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },

    smsTemplateById: (state, action) => {
      state.smsTemplate = state.smsTemplates.find(
        (item) => item._id === action.payload.id
      );
      state.status = "fetched";
    },

    clearSmsTemplate: (state, action) => {
      state.smsTemplate = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(filterSmsTemplate.fulfilled, (state, action) => {
      state.smsTemplates = action.payload;
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

    builder.addCase(addSms.fulfilled, (state, action) => {
      state.smsTemplates.push(action.payload);
      state.status = "added";
      state.error = null;
    });

    builder.addCase(addSms.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addSms.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while adding sms template",
      };
    });
    builder.addCase(updateSmsTemplate.fulfilled, (state, action) => {
      state.smsTemplates = state.smsTemplates.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.status = "updated";
      state.error = null;
    });
    builder.addCase(updateSmsTemplate.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateSmsTemplate.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updating sms template",
      };
    });

    builder.addCase(deleteSmsTemplate.fulfilled, (state, action) => {
      state.smsTemplates = state.smsTemplates.filter(
        (item) => item._id !== action.payload.id
      );
      state.status = "deleted";
    });

    builder.addCase(deleteSmsTemplate.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while deleting sms template",
      };
    });
  },
});

export default smsTemplateSlice.reducer;

export const { clearSmsTemplateStatus, smsTemplateById, clearSmsTemplate } =
  smsTemplateSlice.actions;

export const getSmsTemplateStatus = (state) => state.smsTemplate.status;

export const getSmsTemplates = (state) => state.smsTemplate.smsTemplates;

export const getSmsTemplateError = (state) => state.smsTemplate.error;

export const getSmsTemplate = (state) => state.smsTemplate.smsTemplate;
