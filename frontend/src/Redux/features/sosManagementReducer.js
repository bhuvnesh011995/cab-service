import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

const initialState = {
  status: "idle",
  error: null,
  selectedSOS: null,
  allSOS: [],
};

export const addSOSReducer = createAsyncThunk(
  "SOS/addSOS",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/SOS/addSOS";
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

export const deleteSOSReducer = createAsyncThunk(
  "SOS/deleteSOS",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/SOS/deleteSOS/" + id;
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

export const getSelectedSOSReducer = createAsyncThunk(
  "SOS/getSelectedSOS",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/SOS/getSelectedSOS/" + id;
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

export const fetchAllSOSs = createAsyncThunk(
  "SOS/fetchAllSOSs",
  async (data, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/SOS/fetchAllSOSs";
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

const sosManagementReducer = createSlice({
  name: "sos",
  initialState,
  reducers: {
    emptySelectedSOS: (state, action) => {
      state.selectedSOS = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSOSReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addSOSReducer.fulfilled, (state, action) => {
        state.status = "completed";
        const filterSOS = state.allSOS.filter(
          (sos) => sos._id == action.payload._id,
        );
        if (filterSOS.length) {
          state.allSOS.map((sos, index) => {
            if (sos._id == filterSOS[0]._id) {
              state.allSOS[index] = action.payload;
            }
          });
        } else {
          state.allSOS.push(action.payload);
        }
      })
      .addCase(addSOSReducer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
    builder
      .addCase(deleteSOSReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSOSReducer.fulfilled, (state, action) => {
        state.status = "completed";
        state.allSOS = state.allSOS.filter(
          (sos) => sos._id != action.payload.id,
        );
      })
      .addCase(deleteSOSReducer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
    builder
      .addCase(getSelectedSOSReducer.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSelectedSOSReducer.fulfilled, (state, action) => {
        state.status = "completed";
        state.selectedSOS = action.payload;
      })
      .addCase(getSelectedSOSReducer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });

    builder
      .addCase(fetchAllSOSs.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllSOSs.fulfilled, (state, action) => {
        state.status = "completed";
        state.allSOS = action.payload;
      })
      .addCase(fetchAllSOSs.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export default sosManagementReducer.reducer;

export const getSelectedSOS = (state) => state.sos.selectedSOS;

export const getSOSs = (state) => state.sos.allSOS;

export const { emptySelectedSOS } = sosManagementReducer.actions;
