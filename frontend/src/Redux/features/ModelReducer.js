import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  model: [],
  message: "",
};

 export const addModel = createAsyncThunk(
  "model/addModel",
  async (data, { rejectWithValue }) => {  
    try {
      let response = await axios.post(BASE_URL + "/models", data);
      if (response.status === 201 && response.data.success) return response.data;
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
 const fetchModel = createAsyncThunk(
    "model/fetchModel",
    async(_,{rejectWithValue}) =>{
        try{
      let response = await axios.get(BASE_URL + "/models/");
      if(response.status === 200) return response.data;
      else
      return rejectWithValue({
       status:response.status,
       data:response.data,
    })
        }
        catch(error){
    
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data
            })
        }
    }
)

const updateModels = createAsyncThunk(
  "model/updateModel",
async(data,{rejectWithValue}) =>{
  console.log("data",data)
try{
   let response = await axios.put(BASE_URL + "/model/" + data.id,data.newData)
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

export const deleteModels = createAsyncThunk(
  "model/deleteModels",
  async(id,{rejectWithValue})=>{
    console.log("idd",id)
    try{
    let response = await axios.delete(BASE_URL+ "/model/" + id )
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

const modelSlice = createSlice({
  name: "model",
  initialState,

    reducers:{
      setSucceessStatus:(state,action)=>{
        state.status = "success";
       }} ,
  
  extraReducers: (builder) => {
    builder.addCase(addModel.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(addModel.fulfilled, (state, action) => {
      state.status = "added";
      state.error = null;
      state.model = state.model.concat(action.payload.models);
      state.message = action.payload.message;      
    });
    builder.addCase(addModel.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchModel.pending,(state,action) =>{
        state.status ="loading";
        state.error= null;
    });
    builder.addCase(fetchModel.fulfilled,(state,action)=>{
        state.status ="succeeded";
    state.error = null;
    state.model = action.payload.models; 
});
    builder.addCase(fetchModel.rejected,(state,action)=>{
   state.status ="error";
   state.error =   action.payload;
    }) ;
    builder.addCase(updateModels.pending,(state,action) =>{
      state.status ="loading";
      state.error = null;
   });
   builder.addCase(updateModels.fulfilled,(state,action) =>{
    state.status="update";
    state.model = state.model.map((item) =>
    item._id === action.payload.models._id ? action.payload.models : item
); 
state.error = null
   });
   builder.addCase(updateModels.rejected,(state,action) =>{
    state.status ="error";
    state.error = action.payload
   });
   builder.addCase(deleteModels.pending,(state,action) =>{
    state.status = "loading";
    state.error = null;
  });
  builder.addCase(deleteModels.fulfilled,(state,action) =>{
    state.status = "deleted";
    state.error = null;
    state.model = state.model.filter((item)=> item._id !== action.payload.id)
    state.message = action.payload.message
  })

  builder.addCase(deleteModels.rejected, (state, action) => {
    state.status = "error";
    state.error = action.payload;
  });
  },
});
 const getAllModel = (state) => state.model.model;

 export {
  getAllModel,
  fetchModel,
  updateModels,
 }

export default modelSlice.reducer;