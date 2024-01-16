import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  status: "idle",
  show: false,
  url: "",
  id: null,
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    closeModal: (state, action) => {
      return initialState;
    },
    openModal: (state, action) => {
      state.status = "active";
      state.show = true;
      state.url = action.payload.url;
      state.id = action.payload.id;
    },
    deleteSuccess: (state, action) => {
      state.status = "delete";
    },
    doneDelete: (state, action) => {
      state.status = "ok";
    },
  },
});

export const { openModal, closeModal, deleteSuccess, doneDelete } =
  deleteSlice.actions;
export default deleteSlice.reducer;

export const showDeleteModal = (state) => state.delete.show;
export const status = (state) => state.delete.status;
export const url = (state) => state.delete.url;
