import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  promotion: [],
  selectPromoCode: null,
  viewPromotion: null,
  promoCode: [],
};

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
const updatePromotion = createAsyncThunk(
  "promotion/updatePromotion",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        BASE_URL + "/promotion/" + data.id,
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

const promotionSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    updatePromoCodeById: (state, action) => {
      let obj = state.promoCode.find(
        (selectPromoCode) => selectPromoCode._id === action.payload.id
      );
      state.status = "fetched";
      state.selectPromoCode = {
        ...obj,
        country: obj.country._id,
        state: obj.state._id,
        city: obj.city._id,
      };
    },
    getViewPromotion: (state, action) => {
      state.viewPromotion = state.promotion.find(
        (viewPromotion) => viewPromotion._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewPromotion: (state, action) => {
      state.viewVehicleType = null;
    },
    cleanPromoCode: (state, action) => {
      state.selectPromoCode = null;
    },
    cleanPromotionStatus: (state, action) => {
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
    builder.addCase(updatePromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePromotion.fulfilled, (state, action) => {
      state.status = "update";
      state.promotion = state.promotion.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    });
    builder.addCase(updatePromotion.rejected, (state, action) => {
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

export default promotionSlice.reducer;

export { addPromoCode, fetchPromoCode, updatePromotion };
export const getAllPromoCode = (state) => state.promoCode.promoCode;
export const statusPromoCode = (state) => state.promoCode.status;
export const error = (state) => state.promotion.error;
export const {
  cleanPromotionStatus,
  updatePromoCodeById,
  cleanPromotion,
  getViewPromotion,
} = promotionSlice.actions;
export const getPromoCode = (state) => state.promoCode.selectPromoCode;
export const getAllViewPromotion = (state) => state.promotion.viewPromotion;
