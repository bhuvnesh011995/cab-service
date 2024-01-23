import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
import { ClassNames } from "@emotion/react";

let initialState = {
  status: "idle",
  error: null,
  model: [],
  message: "",
  selectModel: null,
};

export const addModel = createAsyncThunk(
  "model/addModel",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/models", data);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: response.status,
        });
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
      });
    }
  }
);
const fetchModel = createAsyncThunk(
  "model/fetchModel",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/models/");
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
  }
);

const updateModels = createAsyncThunk(
  "model/updateModels",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      let response = await axios.put(
        BASE_URL + "/model/" + data.id,
        data.newData
      );
      if (response.status === 200) return response.data;
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

export const deleteModels = createAsyncThunk(
  "model/deleteModels",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/model/" + id);
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
  }
);

export const filterModel = createAsyncThunk(
  "manufacturer/filterManufacturer",
  async ({ name, status, manufacturer } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/model/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (manufacturer) url.searchParams.set("manufacturer", manufacturer);
      if (status) url.searchParams.set("status", status);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          data: response?.data?.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error?.response?.data?.message,
      });
    }
  }
);

const modelSlice = createSlice({
  name: "model",
  initialState,

  reducers: {
    setSucceessStatus: (state, action) => {
      state.status = "success";
    },
    updateModelById: (state, action) => {
      let obj = state.model.find(
        (selectModel) => selectModel._id === action.payload.id
      );
      state.selectModel = { ...obj, manufacturer: obj.manufacturer._id };
      state.status = "fetched";
    },
    cleanModel: (state, action) => {
      state.selectModel = null;
    },
    cleanModlStatus: (state, action) => {
      state.model = "ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addModel.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addModel.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.model = state.model.concat(action.payload);
      state.message = action.payload.message;
    });
    builder.addCase(addModel.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchModel.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchModel.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.model = action.payload.models;
    });
    builder.addCase(fetchModel.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateModels.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateModels.fulfilled, (state, action) => {
      state.status = "update";
      state.model = state.model.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    });
    builder.addCase(updateModels.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteModels.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteModels.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.model = state.model.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteModels.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(filterModel.fulfilled, (state, action) => {
      state.status = "filtered";
      state.model = action.payload;
    });
    builder.addCase(filterModel.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterModel.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});
const getAllModel = (state) => state.model.model;

export { getAllModel, fetchModel, updateModels };

export default modelSlice.reducer;
export const { updateModelById, cleanModel, cleanModlStatus } =
  modelSlice.actions;
export const status = (state) => state.model.status;
export const getModel = (state) => state.model.selectModel;
