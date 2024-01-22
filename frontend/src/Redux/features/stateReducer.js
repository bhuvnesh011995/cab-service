import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchManufacturer } from "./ManufacturerReducer";
let initialState = {
  states: [],
  status: "idle",
  state: null,
  error: null,
};
export const filterStates = createAsyncThunk(
  "states/filterStates",
  async ({ name, status, country } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/state/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (country) url.searchParams.set("country", country);
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
        message: error?.response?.data?.message || "error while fetching state",
      });
    }
  }
);
export const fetchStates = createAsyncThunk(
  "states/fetchStates",
  async (countryId, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/state/" + countryId);
      if (response.status === 200) {
        return response.data;
      } else
        return rejectWithValue({
          status: "error",
          message: response.data.message,
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message,
      });
    }
  }
);

export const addState = createAsyncThunk(
  "state/addState",
  async (stateData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/state`, stateData);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while adding country",
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while adding country",
      });
    }
  }
);

export const updateStateById = createAsyncThunk(
  "state/updateState",
  async (updateState, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/state/${updateState.id}`,
        updateState.data
      );
      console.log(response);
      if (response.status === 200) return response.data;
      else
        rejectWithValue({
          status: "error",
          message: response?.data?.message || "error while updating country",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message:
          error.response?.data?.message || "error while updating country",
      });
    }
  }
);

export const deleteState = createAsyncThunk(
  "state/deleteState",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data.message ?? "error while deleting country",
        });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message: error.response.data.message ?? "error while deleting country",
      });
    }
  }
);

const stateSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    emptyStates: (state, action) => initialState,
    stateForUpdate: (state, action) => {
      let obj = state.states.find((state) => state._id === action.payload.id);
      obj.country = obj.country?._id;
      state.state = obj;
    },
    clearState: (state, action) => {
      state.state = null;
    },
    clearStateStatus: (state, action) => {
      state.status = "OK";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStates.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.states = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStates.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchStates.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });

    builder.addCase(filterStates.fulfilled, (state, action) => {
      state.status = "filtered";
      state.states = action.payload;
    });
    builder.addCase(filterStates.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterStates.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addState.fulfilled, (state, action) => {
      state.status = "added";
      state.states.push(action.payload);
      state.error = null;
    });
    builder.addCase(addState.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addState.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || { message: "some error occured" };
    });
    builder.addCase(updateStateById.fulfilled, (state, action) => {
      state.status = "updated";
      state.states = state.states.map((state) =>
        state._id !== action.payload._id ? state : action.payload
      );
      state.error = null;
    });
    builder.addCase(updateStateById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateStateById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updating state",
      };
    });
    builder.addCase(deleteState.fulfilled, (state, action) => {
      state.states = state.states.filter(
        (state) => state._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteState.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while deleting state",
      };
    });
  },
});

export default stateSlice.reducer;

export const stateStatus = (state) => state.states.status;

export const stateById = (state, id) => {
  return state.states.states.find((state) => state._id === id);
};
export const stateError = (state) => state.states.error;
export const getStates = (state) => state.states.states;
export const getstate = (state) => state.states.state;
export const { emptyStates, stateForUpdate, clearState, clearStateStatus } =
  stateSlice.actions;
