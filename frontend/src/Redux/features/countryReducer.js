import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
let initialState = {
  contries: [],
  status: "idle",
  error: null,
};
export const fetchContries = createAsyncThunk(
  "contries/fetchContries",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios.get(BASE_URL + "/contries");
      return response.data;
    } catch (error) {}
  }
);

const contriySlice = createSlice({
  name: "contries",
  initialState,
  reducers: {
    updateContryById(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contries = action.payload;
      state.error = null;
    });
  },
});

export const { updateContryById } = contriySlice.actions;

export default contriySlice.reducer;

useSelector(contryStatus);
export const contryStatus = (state) => state.status;

export const contryById = (state, id) => {
  return state.contries.find((contry) => contry._id === id);
};

useSelector((state) => contryById(state, "1234"));
