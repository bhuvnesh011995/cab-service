import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
import { filter } from "@chakra-ui/react";

const initialState = {
  pages: [],
  status: "idle",
  error: null,
  page: null,
};

export const filterPage = createAsyncThunk(
  "page/filterPage",
  async ({ search }, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/page/filter", BASE_URL);
      if (search) url.searchParams.set("search", search);
      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while fetching pages",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while fetching pages",
      });
    }
  }
);

export const addPage = createAsyncThunk(
  "pages/addPage",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/page", data);

      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while adding page",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while adding page",
      });
    }
  }
);

export const updatePage = createAsyncThunk(
  "pages/updatePage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let response = await axios.put(BASE_URL + "/page/" + id, data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message:
            response.data?.message || "error occured while updateing page ",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message:
          error.response?.data?.message ||
          "error occured while updateing page ",
      });
    }
  }
);

export const deletePage = createAsyncThunk(
  "pages/deletePage",
  async ({ id, url }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data?.message || "error while deleting page",
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        status: "error",
        message: error.response?.data?.message || "error while deleting page",
      });
    }
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    clearPageStatus: (state, aciton) => {
      state.error = null;
      state.status = "OK";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterPage.fulfilled, (state, aciton) => {
      state.pages = aciton.payload;
      state.status = "filtered";
      state.error = null;
    });
    builder.addCase(filterPage.pending, (state, aciton) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(filterPage.rejected, (state, aciton) => {
      state.status = "error";
      state.error = aciton.payload || {
        status: "error",
        message: "error while filtering pages",
      };
    });
    builder.addCase(addPage.fulfilled, (state, action) => {
      state.pages.push(action.payload);
      state.status = "added";
      state.error = null;
    });

    builder.addCase(addPage.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addPage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while adding page",
      };
    });

    builder.addCase(updatePage.fulfilled, (state, action) => {
      state.pages = state.pages.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.status = "updated";
      state.error = null;
    });
    builder.addCase(updatePage.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while updateing page",
      };
    });
    builder.addCase(deletePage.fulfilled, (state, action) => {
      state.pages = state.pages.filter(
        (item) => item._id !== action.payload.id
      );
      state.status = "deleted";
      state.error = null;
    });
    builder.addCase(deletePage.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deletePage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload || {
        status: "error",
        message: "error while deleting page",
      };
    });
  },
});

export default pageSlice.reducer;

export const { clearPageStatus } = pageSlice.actions;

export const getPages = (state) => state.pages.pages;

export const getPageStatus = (state) => state.pages.status;

export const getPageError = (state) => state.pages.error;

export const getPage = (state) => state.pages.page;
