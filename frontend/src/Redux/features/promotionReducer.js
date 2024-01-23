import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  promotion: [],
  selectPromotion: null,
};

const addPromotion = createAsyncThunk(
  "promotion/addPromotion",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/promotion/self", data);
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
const fetchPromotion = createAsyncThunk(
  "promotion/fetchPromotion",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/promotion/");
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

export const deletePromotion = createAsyncThunk(
  "delete/deletePromotion",
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
  name: "promotion",
  initialState,
  reducers: {
    updatePromotionById: (state, action) => {
      let obj = state.promotion.find(
        (selectPromotion) => selectPromotion._id === action.payload.id
      );
      state.status = "fetched";
      state.selectPromotion = {
        ...obj,
        country: obj.country._id,
        state: obj.state._id,
        city: obj.city._id,
      };
    },
    cleanPromotion: (state, action) => {
      state.selectPromotion = null;
    },
    cleanPromotionStatus: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPromotion.fulfilled, (state, action) => {
      state.status = "added";
      state.promotion = (state.promotion || []).concat(action.payload);
    });
    builder.addCase(addPromotion.rejected, (state, action) => {
      state.status = "error";
      state.promotion = action.payload;
    });
    builder.addCase(fetchPromotion.pending, (state, action) => {
      state.status = "loading";
      state.promotion = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPromotion.fulfilled, (state, action) => {
      state.status = "successed";
      state.promotion = action.payload;
    });
    builder.addCase(fetchPromotion.rejected, (state, action) => {
      state.status = "error";
      state.promotion = action.payload;
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
    builder.addCase(deletePromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deletePromotion.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.promotion = state.promotion.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deletePromotion.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default promotionSlice.reducer;

export { addPromotion, fetchPromotion, updatePromotion };
export const getAllPromotion = (state) => state.promotion.promotion;
export const status = (state) => state.promotion.status;
export const error = (state) => state.promotion.error;
export const { cleanPromotionStatus, updatePromotionById, cleanPromotion } =
  promotionSlice.actions;
export const getPromotion = (state) => state.promotion.selectPromotion;
