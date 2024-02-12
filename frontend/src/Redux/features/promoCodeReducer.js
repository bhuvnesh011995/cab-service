import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  promotion: [],
  selectPromoCode: null,
  viewPromoCode: null,
  promoCode: [],
};

export const filterPromoCode = createAsyncThunk(
  "promoCode/filterPromoCode",
  async ({ promoCode, state, city }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/promoCode/filter", BASE_URL);
      if (promoCode) url.searchParams.set("promoCode", promoCode);
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

const addPromoCode = createAsyncThunk(
  "promoCode/addPromoCode",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/promoCode", data);
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
const fetchPromoCode = createAsyncThunk(
  "PromoCode/fetchPromoCode",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/promoCode/");
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
const updatePromoCode = createAsyncThunk(
  "promoCode/updatePromoCode",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        BASE_URL + "/promoCode/" + data.id,
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

export const deletePromoCode = createAsyncThunk(
  "promoCode/deletePromoCode",
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

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    updatePromoCodeById: (state, action) => {
      const promoCodeToUpdate = state.promoCode.find(
        (selectPromoCode) => selectPromoCode._id === action.payload.id
      );

      if (promoCodeToUpdate) {
        state.status = "fetched";

        let updatedSelectUser;

        updatedSelectUser = [
          {
            value: promoCodeToUpdate.selectUser._id,
            label: `${
              promoCodeToUpdate.selectUser.name
                ? promoCodeToUpdate.selectUser.name
                : ""
            } ${
              promoCodeToUpdate.selectUser.firstName
                ? promoCodeToUpdate.selectUser.firstName
                : ""
            }`,
          },
        ];

        state.selectPromoCode = {
          ...promoCodeToUpdate,
          country: promoCodeToUpdate.country._id,
          state: promoCodeToUpdate.state._id,
          city: promoCodeToUpdate.city._id,
          vehicleType: promoCodeToUpdate.vehicleType._id,
          selectUser: updatedSelectUser,
          validFrom: promoCodeToUpdate.validFrom.slice(0, 10),
          validTo: promoCodeToUpdate.validTo.slice(0, 10),
        };
      } else {
        console.error("Promo code with ID", action.payload.id, "not found.");
      }
    },
    getViewPromoCode: (state, action) => {
      state.viewPromoCode = state.promoCode.find(
        (viewPromoCode) => viewPromoCode._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewPromoCode: (state, action) => {
      state.viewPromoCode = null;
    },
    cleanPromoCode: (state, action) => {
      state.selectPromoCode = null;
    },
    cleanPromoCodeStatus: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addPromoCode.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPromoCode.fulfilled, (state, action) => {
      state.status = "added";
      state.promoCode = (state.promoCode || []).concat(action.payload);
    });
    builder.addCase(addPromoCode.rejected, (state, action) => {
      state.status = "error";
      state.promoCode = action.payload;
    });
    builder.addCase(fetchPromoCode.pending, (state, action) => {
      state.status = "loading";
      state.promoCode = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPromoCode.fulfilled, (state, action) => {
      state.status = "successed";
      state.promoCode = action.payload;
    });
    builder.addCase(fetchPromoCode.rejected, (state, action) => {
      state.status = "error";
      state.promoCode = action.payload;
    });
    builder.addCase(filterPromoCode.pending, (state, action) => {
      state.status = "loading";
      state.promoCode = action.payload;
      state.error = null;
    });
    builder.addCase(filterPromoCode.fulfilled, (state, action) => {
      state.status = "filtered";
      state.promoCode = action.payload;
    });
    builder.addCase(filterPromoCode.rejected, (state, action) => {
      state.status = "error";
      state.promoCode = action.payload;
    });
    builder.addCase(updatePromoCode.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePromoCode.fulfilled, (state, action) => {
      state.status = "update";
      state.promoCode = state.promoCode.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    });
    builder.addCase(updatePromoCode.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deletePromoCode.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deletePromoCode.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.promoCode = state.promoCode.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deletePromoCode.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default promoCodeSlice.reducer;

export { addPromoCode, fetchPromoCode, updatePromoCode };
export const getAllPromoCode = (state) => state.promoCode.promoCode;
export const statusPromoCode = (state) => state.promoCode.status;
export const error = (state) => state.promotion.error;
export const {
  cleanPromoCodeStatus,
  updatePromoCodeById,
  cleanPromoCode,
  getViewPromoCode,
} = promoCodeSlice.actions;
export const getPromoCode = (state) => state.promoCode.selectPromoCode;
export const getAllViewPromoCode = (state) => state.promoCode.viewPromoCode;
