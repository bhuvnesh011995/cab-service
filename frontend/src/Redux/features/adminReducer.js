import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";
import { SatelliteAlt } from "@mui/icons-material";

let initialState = {
  admins: [],
  status: "idle",
  admin: null,
  error: null,
};

export const deleteAdmin = createAsyncThunk(
  "admins/id",
  async ({ url, id }, { rejectWithValue }) => {
    try {
      let response = await axios.delete(url);
      if (response.status === 204) return { id };
      else
        return rejectWithValue({
          status: "error",
          message: response.data.message ?? "error while deleting",
        });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return rejectWithValue({
        status: "error",
        message: error.response.data.message ?? "error while deleting",
      });
    }
  }
);

export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async ({ name, username, status, from, to } = {}, { rejectWithValue }) => {
    try {
      let url = new URL("/test/api/v1/admins/filter", BASE_URL);
      if (name) url.searchParams.set("name", name);
      if (username) url.searchParams.set("username", username);
      if (status) url.searchParams.set("status", status);
      if (from) url.searchParams.set("from", from);
      if (to) url.searchParams.set("to", to);

      let response = await axios.get(url.href);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const fetchAdminById = createAsyncThunk(
  "admins/fetAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/admin/" + id;
      console.log(url, "hii");
      let response = await axios.get(url);
      console.log(response);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: "error while fetching",
        });
    } catch (error) {
      console.log(error.response);
      rejectWithValue({
        status: "error",
        message: error.response.data.message ?? "error while admin",
      });
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admins/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      let response = await axios.post(BASE_URL + "/auth/signUp", adminData);
      if (response.status === 201) return response.data;
      else
        return rejectWithValue({
          status: (await response).status,
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

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (admin, { rejectWithValue }) => {
    try {
      const url = BASE_URL + "/admin/" + admin.id;
      let response = await axios.put(url, admin.data);
      if (response.status === 200) return response.data;
      else
        return rejectWithValue({
          status: "error",
          message: "error while update admin",
        });
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: "error while updating admin",
      });
    }
  }
);

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearAdmin: (state, action) => {
      state.admin = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAdmins.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.admins = action.payload;
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addAdmin.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.admins.push(action.payload);
    });
    builder.addCase(addAdmin.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error;
    });
    builder.addCase(fetchAdminById.fulfilled, (state, action) => {
      state.admin = action.payload;
      state.error = null;
      state.status = "fetched";
    });
    builder.addCase(fetchAdminById.rejected, (state, action) => {
      state.status = action.payload?.status || "error";
      state.error = action.payload;
      state.admin = null;
    });
    builder.addCase(fetchAdminById.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
      state.admin = null;
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.status = "updated";
      state.admins = state.admins.map((admin) => {
        if (admin._id === action.payload._id) return action.payload;
        else return admin;
      });
      state.error = null;
    });
    builder.addCase(updateAdmin.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.status = "error";
      state.error = {
        status: "error",
        message: action.payload.message ?? "error while updating admin",
      };
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.admins = state.admins.filter(
        (admin) => admin._id !== action.payload.id
      );
      state.status = "deleted";
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.status = "error";
      state.error = { status: "error", message: "error while deleting admin" };
    });
  },
});

export default adminsSlice.reducer;
export const { clearAdmin } = adminsSlice.actions;

export const getAllAdmins = (state) => state.admins.admins;

export const getAdmin = (state) => state.admins.admin;

export const status = (state) => state.admins.status;
