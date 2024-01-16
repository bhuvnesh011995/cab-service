import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: 'idle',
  error: null,
  vehicleType: [],
  message: ''
};

const addVehicleType = createAsyncThunk(
    "vehicleType/addVehicleType",
    async (data, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", data.file);
        const response = await axios.post(BASE_URL + "/vehicleType/", formData);
  
        if (response.status === 201) {
          return response.data;
        } else {
          return rejectWithValue({
            status: response.status,
            message: response.data.message,
          });
        }
      } catch (error) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      }
    }
  );
  
const fetchVehicleType = createAsyncThunk(
    "vehicleType/fetchVehicleType",
    async (_, { rejectWithValue }) => {
      try {
        let response = await axios.get(BASE_URL + "/vehicleType/");
        if (response.status === 200) return response.data;
        else {
          return rejectWithValue({
            status: response.status,
            message: response.data.message,
          });
        }
      } catch (error) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      }
    }
  );
    
export const deleteVehicleType = createAsyncThunk(
    "vehicleType/deleteVehicleType",
    async(id,{rejectWithValue})=>{
      try{
      let response = await axios.delete(BASE_URL+ "/vehicleType/" + id )
      if(response.status === 200) return {...response.data,id}
      else
      return rejectWithValue({
       status: response.status,
       message: response.data.message 
  
      })
      }
      catch(error){
        return rejectWithValue({
          status: error.response.status,
          message: error.data.message 
        })
      }
    }
  )
  const updateVehicleType= createAsyncThunk(
    "vehicleType/updateVehicleType",
  async(data,{rejectWithValue}) =>{
    console.log("data",data)
  try{
     let response = await axios.put(BASE_URL + "/vehicleType/" + data.id,data.newData)
     if(response.status=== 200) return response.data
     else 
     return rejectWithValue({
      status: response.status,
      message: response.data.message,
    })
  }
  catch(error){
    return rejectWithValue({
      status:error.response.status,
      message:error.response.data.message
    })
  }
  }
  )
  

const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVehicleType.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addVehicleType.fulfilled, (state, action) => {
        state.status = "added";
        state.error = null;
        state.vehicleType.push(action.payload.vehicleType);
        state.message = action.payload.message;      
      })
      .addCase(addVehicleType.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload
    
      });
      builder
      .addCase(fetchVehicleType.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.vehicleType = action.payload.vehicleType; 
    })
      .addCase(fetchVehicleType.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload
         state.vehicleType = action.payload
      });
      builder.addCase(deleteVehicleType.pending,(state,action) =>{
        state.status = "loading";
        state.error = null;
      });
      builder.addCase(deleteVehicleType.fulfilled,(state,action) =>{
        state.status = "deleted";
        state.error = null;
        state.vehicleType = state.vehicleType.filter((item)=> item._id !== action.payload.id)
        state.message = action.payload.message
      })
    
      builder.addCase(deleteVehicleType.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
      builder.addCase(updateVehicleType.pending,(state,action) =>{
        state.status ="loading";
        state.error = null;
     });
     builder.addCase(updateVehicleType.fulfilled,(state,action) =>{
      state.status="update";
      state.vehicleCategory = state.vehicleCategory.map((item) =>
      item._id === action.payload.vehicleCategory._id ? action.payload.vehicleCategory : item
  ); 
  state.error = null
     });
     builder.addCase(updateVehicleType.rejected,(state,action) =>{
      state.status ="error";
      state.error = action.payload
     });
   
  },
});

export default vehicleTypeSlice.reducer;
const getAllVehicleType = (state) => state.vehicleType.vehicleType
export { addVehicleType,getAllVehicleType,fetchVehicleType };
