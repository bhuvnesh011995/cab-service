import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
let initialState = {
  countries: [],
  status: "idle",
  country: null,
  error: null,
};

export const filterCountries = createAsyncThunk(
  "countries/fetchControies",
  async ({ name, status } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/contries/filter", BASE_URL);
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

export const addCountry = createAsyncThunk(
  "country/addCountry",
  async (countryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/country`, countryData);
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

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/country");
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

export const updateCountryById = createAsyncThunk(
  "country/updateCountry",
  async (updatedCounty, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/country/${updatedCounty.id}`,
        updatedCounty.data
      );

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

export const deleteCountry = createAsyncThunk(
  "country/deleteCountry",
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

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    clearStatus: (state, action) => {
      state.status = "cleared";
    },
    updateCountry: (state, action) => {
      state.country = state.countries.find(
        (country) => country._id === action.payload.id
      );
    },
    clearCountry: (state, action) => {
      state.country = null;
    },
    clearCountryStatus: (state, action) => {
      state.status = "OK";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.countries = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });
    builder.addCase(filterCountries.fulfilled, (state, action) => {
      state.status = "filtered";
      state.countries = action.payload;
    });
    builder.addCase(filterCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterCountries.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addCountry.fulfilled, (state, action) => {
      state.status = "added";
      state.countries.push(action.payload);
      state.error = null;
    });
    builder.addCase(addCountry.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addCountry.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || { message: "some error occured" };
    });
    builder.addCase(updateCountryById.fulfilled, (state, action) => {
      state.status = "updated";
      state.countries = state.countries.map((country) =>
        country._id !== action.payload._id ? country : action.payload
      );
      state.error = null;
    });
    builder.addCase(updateCountryById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateCountryById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updating country",
      };
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.countries = state.countries.filter(
        (country) => country._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while deleting country",
      };
    });
  },
});

export default countrySlice.reducer;
export const { clearStatus, clearCountry, updateCountry, clearCountryStatus } =
  countrySlice.actions;

export const status = (state) => state.countries.status;

export const countryById = (state, id) => {
  return state.countries.countries.find((country) => country._id === id);
};
export const error = (state) => state.countries.error;
export const getCountries = (state) => state.countries.countries;
export const getCountry = (state) => state.countries.country;
