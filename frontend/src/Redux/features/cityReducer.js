import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import { fetchManufacturer } from "./ManufacturerReducer";
import axios from "axios";
let initialState = {
  cities: [],
  status: "idle",
  error: null,
  city: null,
};

export const filterCities = createAsyncThunk(
  "cities/filter",
  async ({ text }, { rejectWithValue }) => {
    try {
      console.log(text, "text");
      let url = new URL("/test/api/v1/cities/filter", BASE_URL);
      if (text) url.searchParams.set("text", text);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while fetching cities",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response.data?.message || "error while fetching cities",
      });
    }
  }
);

export const AddCity = createAsyncThunk(
  "city/addCity",
  async (cityData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/city`, cityData);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while adding city",
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while adding city",
      });
    }
  }
);

export const updateCityById = createAsyncThunk(
  "city/updateCity",
  async (updatedCity, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/country/${updatedCity.id}`,
        updatedCity.data
      );

      if (response.status === 200) return response.data;
      else
        rejectWithValue({
          status: "error",
          message: response?.data?.message || "error while updating city",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while updating city",
      });
    }
  }
);

export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data.message ?? "error while deleting city",
        });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message: error.response.data.message ?? "error while deleting city",
      });
    }
  }
);

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (stateId, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/cities/" + stateId);
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

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    emptyCities: (state, action) => initialState,
    clearCityStatus: (state, action) => {
      state.status = "OK";
    },
    updateCityData: (state, action) => {
      let citiData = state.cities.find(
        (city) => city._id === action.payload.id
      );
      citiData.state = citiData.state?.name;
      citiData.country = citiData.country?.name;
      state.city = citiData;
    },
    clearCity: (state, action) => {
      state.city = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cities = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCities.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.status = "error";
      state.error = { message: action.payload.message };
    });

    builder.addCase(filterCities.fulfilled, (state, action) => {
      state.status = "filtered";
      state.cities = action.payload;
    });
    builder.addCase(filterCities.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterCities.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while fetching cities",
      };
    });
    builder.addCase(AddCity.fulfilled, (state, action) => {
      state.status = "added";
      state.countries.push(action.payload);
      state.error = null;
    });
    builder.addCase(AddCity.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(AddCity.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || { message: "some error occured" };
    });

    builder.addCase(updateCityById.fulfilled, (state, action) => {
      state.status = "updated";
      state.cities = state.cities.map((country) =>
        country._id !== action.payload._id ? country : action.payload
      );
      state.error = null;
    });
    builder.addCase(updateCityById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateCityById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updating city",
      };
    });
    builder.addCase(deleteCity.fulfilled, (state, action) => {
      state.cities = state.cities.filter(
        (city) => city._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteCity.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while deleting city",
      };
    });
  },
});

export default citySlice.reducer;

export const cityStatus = (state) => state.cities.status;

export const cityByid = (state, id) => {
  return state.cities.cities.find((city) => city._id === id);
};
export const getCities = (state) => state.cities.cities;

export const { emptyCities, clearCityStatus, updateCityData, clearCity } =
  citySlice.actions;
export const cityError = (state) => state.cities.error;
export const getCity = (state) => state.cities.city;
