import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  manufacturer: [],
  message: "",
  selectManufacturer: null,
};
export const filterManufacturer = createAsyncThunk(
  "manufacturer/filterManufacturer",
  async ({ name, status } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/manufacturer/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (status) url.searchParams.set("status", status);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          data: response?.data?.message,
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message:
          error?.response?.data?.message || "error while fetching contry",
      });
    }
  }
);

export const addManufacturer = createAsyncThunk(
  "manufacturer/addManufacturer",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/manufacturer", data);
      if (response.status === 201) return response.data;
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

export const fetchManufacturer = createAsyncThunk(
  "manufacturer/fetchManufacturer",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/manufacturer/");
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
export const deleteManufacturer = createAsyncThunk(
  "manufacturer/deleteManufacture",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axios.delete(BASE_URL + "/manufacturer/" + id);
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
const updateManufacturer = createAsyncThunk(
  "manufacturer/updateManufacturer",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      let response = await axios.put(
        BASE_URL + "/manufacturer/" + data.id,
        data.newData
      );
      if (response.status === 200) {
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
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setSucceessStatus: (state, action) => {
      state.status = "success";
    },
    updatetManufacturerById: (state, action) => {
      state.selectManufacturer = state.manufacturer.find(
        (selectManufacturer) => selectManufacturer._id === action.payload.id
      );
      state.status = "fetched";
    },
    cleanManfacturer: (state, action) => {
      state.selectManufacturer = null;
    },
    cleanManufaturerStatus: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers(builder) {
    builder.addCase(addManufacturer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addManufacturer.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.manufacturer = state.manufacturer.concat(action.payload);
      state.message = action.payload.message;
    });
    builder.addCase(addManufacturer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchManufacturer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchManufacturer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.manufacturer = action.payload.manufacturer;
    });
    builder.addCase(fetchManufacturer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateManufacturer.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateManufacturer.fulfilled, (state, action) => {
      state.status = "updated";
      state.error = null;
      state.manufacturer = state.manufacturer.map((item) =>
        item._id === action.payload.manufacturer._id
          ? action.payload.manufacturer
          : item
      );
    });
    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteManufacturer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteManufacturer.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.manufacturer = state.manufacturer.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteManufacturer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(filterManufacturer.fulfilled, (state, action) => {
      state.status = "filtered";
      state.manufacturer = action.payload;
    });
    builder.addCase(filterManufacturer.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterManufacturer.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const selectManufacturer = (state) => state.manufacturer.manufacturer;
export default manufacturerSlice.reducer;
export { updateManufacturer };
export const {
  updatetManufacturerById,
  cleanManfacturer,
  cleanManufaturerStatus,
} = manufacturerSlice.actions;
export const status = (state) => state.manufacturer.status;
export const getManufacturer = (state) => state.manufacturer.selectManufacturer;
