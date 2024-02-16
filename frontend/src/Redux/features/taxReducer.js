import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
import { AcUnitTwoTone, Addchart } from "@mui/icons-material";
import { status } from "./deleteModalReducer";
import { baseTheme } from "@chakra-ui/react";
const initialState = {
  taxes: [],
  status: "idle",
  error: null,
  tax: null,
  viewTaxes: null,
};
export const filterTax = createAsyncThunk(
  "tax/filter",
  async ({ title, status }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/tax/filter", BASE_URL);
      if (title) url.searchParams.set("title", title);
      if (status) url.searchParams.set("status", status);
      let response = await axios.get(url.href);

      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while fetching taxes",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error?.response?.data?.message || "error while fetching taxes",
      });
    }
  }
);

export const addTax = createAsyncThunk(
  "tax/addTax",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/tax";
      let response = await axios.post(url, data);

      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while adding tax",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while adding tax",
      });
    }
  }
);

export const updateTax = createAsyncThunk(
  "tax/updateTax",
  async (data, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/tax/" + data.id;
      let response = await axios.put(url, data.data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while updating tax",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while updating tax",
      });
    }
  }
);

export const deleteTax = createAsyncThunk(
  "tax/deleteTax",
  async ({ id, url }, { rejectWithValue }) => {
    try {
      let url = BASE_URL + "/tax/" + id;
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while deleting tax",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error?.response?.data?.message || "error while deleting tax",
      });
    }
  }
);

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    clearTaxStatus: (state, action) => {
      state.status = "OK";
      state.error = null;
    },
    taxToUpdate: (state, action) => {
      state.tax = state.taxes.find((tax) => tax._id === action.payload.id);
    },
    clearTax: (state, action) => {
      state.tax = null;
    },

    getViewTaxes: (state, action) => {
      state.viewTaxes = state.taxes.find(
        (tax) => tax._id === action.payload.id
      );
      state.status = "view";
    },

    cleanViewTaxes: (state, action) => {
      state.viewTaxes = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterTax.fulfilled, (state, action) => {
      state.taxes = action.payload;
      state.status = "filtered";
      state.error = null;
    });
    builder.addCase(filterTax.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterTax.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching",
      };
    });

    builder.addCase(addTax.fulfilled, (state, action) => {
      state.taxes.push(action.payload);
      state.status = "added";
      state.error = null;
    });
    builder.addCase(addTax.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while adding tax",
      };
    });
    builder.addCase(addTax.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(updateTax.fulfilled, (state, action) => {
      state.taxes = state.taxes.map((tax) =>
        tax._id === action.payload._id ? action.payload : tax
      );
      state.status = "updated";
    });
    builder.addCase(updateTax.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateTax.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(deleteTax.fulfilled, (state, action) => {
      state.taxes = state.taxes.filter((tax) => tax._id != action.payload.id);
      state.status = "deleted";
    });
    builder.addCase(deleteTax.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteTax.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default taxSlice.reducer;

export const { clearTaxStatus, taxToUpdate, clearTax, getViewTaxes } =
  taxSlice.actions;

export const taxStatus = (state) => state.tax.status;

export const getTaxes = (state) => state.tax.taxes;

export const getTax = (state) => state.tax.tax;

export const taxError = (state) => state.tax.error;

export const viewTaxes = (state) => state.tax.viewTaxes;
