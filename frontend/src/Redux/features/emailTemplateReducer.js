import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

const initialState = {
  status: "idle",
  error: null,
  selectedEmailTemplate: null,
  emailTemplates: [],
};

export const addEmailTemplateReducer = createAsyncThunk(
  "emailTemplate/addEmail",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/emailTemplates/addEmail";
      const response = await axios.post(url, data);
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message ?? "error occured !",
        });
    } catch (err) {
      return rejectWithValue({
        status: "error",
        message: err.response.data.message ?? "error while deleting",
      });
    }
  },
);

export const deleteEmailTemplateReducer = createAsyncThunk(
  "emailTemplate/deleteEmailTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/emailTemplates/deleteEmailTemplate/" + id;
      const response = await axios.delete(url);
      if (response.status == 200) return { ...response.data, id };
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message ?? "error occured !",
        });
    } catch (err) {
      return rejectWithValue({
        status: "error",
        message: err.response.data.message ?? "error while deleting",
      });
    }
  },
);

export const getSelectedEmailTemplate = createAsyncThunk(
  "emailTemplate/getSelectedEmailTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/emailTemplates/getSelectedEmailTemplate/" + id;
      const response = await axios.get(url);
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message ?? "error occured !",
        });
    } catch (err) {
      return rejectWithValue({
        status: "error",
        message: err.response.data.message ?? "error while deleting",
      });
    }
  },
);

export const fetchEmailTemplates = createAsyncThunk(
  "emailTemplate/fetchEmailTemplates",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/emailTemplates/fetchEmailTemplates";
      const response = await axios.get(url, { params: data });
      if (response.status == 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          message: response.data.message ?? "error occured !",
        });
    } catch (err) {
      return rejectWithValue({
        status: "error",
        message: err.response.data.message ?? "error while deleting",
      });
    }
  },
);

const emailTemplateReducer = createSlice({
  name: "emailTemplate",
  initialState,
  reducers: {
    emptySelectedEmailTemplate: (state, action) => {
      state.selectedEmailTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmailTemplateReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addEmailTemplateReducer.fulfilled, (state, action) => {
        state.status = "completed";
        const filterTemplates = state.emailTemplates.filter(
          (emailTemplate) => emailTemplate._id == action.payload._id,
        );
        if (filterTemplates.length) {
          state.emailTemplates.map((emailTemplate, index) => {
            if (emailTemplate._id == filterTemplates[0]._id) {
              state.emailTemplates[index] = action.payload;
            }
          });
        } else {
          state.emailTemplates.push(action.payload);
        }
      })
      .addCase(addEmailTemplateReducer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
    builder
      .addCase(deleteEmailTemplateReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteEmailTemplateReducer.fulfilled, (state, action) => {
        state.status = "completed";
        console.log(action.payload);
        state.emailTemplates = state.emailTemplates.filter(
          (emailTemplate) => emailTemplate._id != action.payload.id,
        );
      })
      .addCase(deleteEmailTemplateReducer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
    builder
      .addCase(getSelectedEmailTemplate.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSelectedEmailTemplate.fulfilled, (state, action) => {
        state.status = "completed";
        state.selectedEmailTemplate = action.payload;
      })
      .addCase(getSelectedEmailTemplate.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });

    builder
      .addCase(fetchEmailTemplates.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
        state.status = "completed";
        state.emailTemplates = action.payload;
      })
      .addCase(fetchEmailTemplates.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export default emailTemplateReducer.reducer;

export const getSelectedEmail = (state) =>
  state.emailTemplate.selectedEmailTemplate;

export const getEmailTemplates = (state) => state.emailTemplate.emailTemplates;

export const { emptySelectedEmailTemplate } = emailTemplateReducer.actions;
