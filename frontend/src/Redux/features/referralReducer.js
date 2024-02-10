import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  referral: [],
  selectReferral: null,
  viewReferral: null,
};

export const filterReferral = createAsyncThunk(
  "referral/filterReferral",
  async ({ name, country, state, city }, { rejectWithValue }) => {
    console.log("text", name);
    try {
      let url = new URL("/test/api/v1/referral/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (country) url.searchParams.set("country", country);
      if (state) url.searchParams.set("state", state);
      if (city) url.searchParams.set("city", city);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while fetching promotion",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message:
          error.response.data?.message || "error while fetching Promotion",
      });
    }
  }
);

const addReferral = createAsyncThunk(
  "referral/addReferral",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/referral", data);
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
const fetchReferral = createAsyncThunk(
  "referral/fetchReferral",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/referral/");
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
const updateReferral = createAsyncThunk(
  "referral/updateReferral",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        BASE_URL + "/referral/" + data.id,
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

export const deleteReferral = createAsyncThunk(
  "delete/deleteReferral",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
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

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    updateReferralById: (state, action) => {
      let obj = state.referral.find(
        (selectReferral) => selectReferral._id === action.payload.id
      );
      state.status = "fetched";
      const updatedForUsers = obj.forUsers.map((item) => ({
        value: item,
        label: item,
      }));

      state.selectReferral = {
        ...obj,
        country: obj.country._id,
        state: obj.state._id,
        city: obj.city._id,
        forUsers: updatedForUsers,
      };
    },
    getViewReferral: (state, action) => {
      state.viewReferral = state.referral.find(
        (viewReferral) => viewReferral._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewReferral: (state, action) => {
      state.viewReferral = null;
    },
    cleanReferral: (state, action) => {
      state.selectReferral = null;
    },
    cleanReferralStatus: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addReferral.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addReferral.fulfilled, (state, action) => {
      state.status = "added";
      state.referral = (state.referral || []).concat(action.payload);
    });
    builder.addCase(addReferral.rejected, (state, action) => {
      state.status = "error";
      state.referral = action.payload;
    });
    builder.addCase(fetchReferral.pending, (state, action) => {
      state.status = "loading";
      state.promotion = action.payload;
      state.error = null;
    });
    builder.addCase(fetchReferral.fulfilled, (state, action) => {
      state.status = "successed";
      state.referral = action.payload;
    });
    builder.addCase(fetchReferral.rejected, (state, action) => {
      state.status = "error";
      state.referral = action.payload;
    });
    builder.addCase(updateReferral.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateReferral.fulfilled, (state, action) => {
      state.status = "update";

      state.referral = state.referral.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    });
    builder.addCase(updateReferral.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(filterReferral.pending, (state, action) => {
      state.status = "loading";
      state.referral = action.payload;
      state.error = null;
    });
    builder.addCase(filterReferral.fulfilled, (state, action) => {
      state.status = "filtered";
      state.referral = action.payload;
    });
    builder.addCase(filterReferral.rejected, (state, action) => {
      state.status = "error";
      state.referral = action.payload;
    });

    builder.addCase(deleteReferral.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteReferral.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.referral = state.referral.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteReferral.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default referralSlice.reducer;

export { addReferral, fetchReferral, updateReferral };
export const getAllReferral = (state) => state.referral.referral;
export const status = (state) => state.referral.status;
export const error = (state) => state.referral.error;
export const {
  cleanReferralStatus,
  updateReferralById,
  cleanReferral,
  getViewReferral,
} = referralSlice.actions;
export const getReferral = (state) => state.referral.selectReferral;
export const getAllViewReferral = (state) => state.referral.viewReferral;
