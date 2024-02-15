import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  rentalPromotion: [],
  selectRentalPromotion: null,
  viewRentalPromotion: null,
};

export const filterRentalPromotion = createAsyncThunk(
  "promoCode/filterPromoCode",
  async ({ city, packages }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/rentalPromotion/filter", BASE_URL);
      if (packages) url.searchParams.set("package", packages);
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

const addRentalPromotion = createAsyncThunk(
  "rentalPromotion/addRentalPromotion",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/rentalPromotion", data);
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
const fetchRentalPromotion = createAsyncThunk(
  "rentalPromotion/fetchRentalPromotion",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/rentalPromotion/");
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
const updateRentalPromotion = createAsyncThunk(
  "rentalPromotion/updateRentalPromotion",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.put(
        BASE_URL + "/rentalPromotion/" + data.id,
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

export const deleteRentalPromotion = createAsyncThunk(
  "rentalPromotion/deleteRentalPromotion",
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

const rentalPromotionSlice = createSlice({
  name: "rentalPromotion",
  initialState,
  reducers: {
    updateRentalPromotionById: (state, action) => {
      const obj = state.rentalPromotion.find(
        (selectRentalPromotion) =>
          selectRentalPromotion._id === action.payload.id
      );

      if (obj) {
        state.status = "fetched";

        let updatedSelectUser;

        updatedSelectUser = [
          {
            value: obj.selectUser._id,
            label: `${obj.selectUser.name ? obj.selectUser.name : ""} ${
              obj.selectUser.firstName ? obj.selectUser.firstName : ""
            }`,
          },
        ];

        state.selectRentalPromotion = {
          ...obj,
          country: obj.country._id,
          state: obj.state._id,
          city: obj.city._id,
          vehicleType: obj.vehicleType._id,
          package: obj.package._id,
          selectUser: updatedSelectUser,
          validFrom: obj.validFrom.slice(0, 10),
          validTo: obj.validTo.slice(0, 10),
        };
      } else {
        console.error("Promo code with ID", action.payload.id, "not found.");
      }
    },

    getViewRentalPromotion: (state, action) => {
      state.viewRentalPromotion = state.rentalPromotion.find(
        (viewRentalPromotion) => viewRentalPromotion._id === action.payload.id
      );
      state.status = " view";
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
    cleanRentalPromotion: (state, action) => {
      state.selectRentalPromotion = null;
    },
    cleanRentalPromotionStatus: (state, action) => {
      state.status = "Ok";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addRentalPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addRentalPromotion.fulfilled, (state, action) => {
      state.status = "added";
      state.rentalPromotion.push(action.payload);
    });
    builder.addCase(addRentalPromotion.rejected, (state, action) => {
      state.status = "error";
      state.rentalPromotion = action.payload;
    });
    builder.addCase(fetchRentalPromotion.pending, (state, action) => {
      state.status = "loading";
      state.rentalPromotion = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRentalPromotion.fulfilled, (state, action) => {
      state.status = "successed";
      state.rentalPromotion = action.payload;
    });
    builder.addCase(fetchRentalPromotion.rejected, (state, action) => {
      state.status = "error";
      state.rentalPromotion = action.payload;
    });

    builder.addCase(filterRentalPromotion.pending, (state, action) => {
      state.status = "loading";
      state.rentalPromotion = action.payload;
      state.error = null;
    });
    builder.addCase(filterRentalPromotion.fulfilled, (state, action) => {
      state.status = "filtered";
      state.rentalPromotion = action.payload;
    });
    builder.addCase(filterRentalPromotion.rejected, (state, action) => {
      state.status = "error";
      state.rentalPromotion = action.payload;
    });

    builder.addCase(updateRentalPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateRentalPromotion.fulfilled, (state, action) => {
      state.status = "update";
      state.rentalPromotion = state.rentalPromotion.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.error = null;
    });
    builder.addCase(updateRentalPromotion.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteRentalPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteRentalPromotion.fulfilled, (state, action) => {
      state.status = "deleted";
      state.error = null;
      state.rentalPromotion = state.rentalPromotion.filter(
        (item) => item._id !== action.payload.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteRentalPromotion.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default rentalPromotionSlice.reducer;

export { addRentalPromotion, fetchRentalPromotion, updateRentalPromotion };
export const getAllRentalPromotion = (state) =>
  state.rentalPromotion.rentalPromotion;
export const status = (state) => state.rentalPromotion.status;
export const error = (state) => state.rentalPromotion.error;
export const {
  cleanRentalPromotionStatus,
  updateRentalPromotionById,
  cleanRentalPromotion,
  getViewRentalPromotion
} = rentalPromotionSlice.actions;
export const getRentalPromotion = (state) =>
  state.rentalPromotion.selectRentalPromotion;
export const getAllViewRentalPromotion = (state) =>
  state.rentalPromotion.viewRentalPromotion;
