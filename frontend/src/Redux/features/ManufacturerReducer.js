import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config/config";

let initialState = {
  status: "idle",
  error: null,
  manufacturer:[],
  message:""
};

export const postManufacturer = createAsyncThunk(
  "manufacturer/postManufacturer",
  async(data,{rejectWithValue}) =>{
    try{
      let response = await axios.post(BASE_URL +"/make",data)
      if(response.status === 201 && response.data.success)  return response.data;
      else 
      return rejectWithValue({
      status :response.status,
      message: response.data.message 
      }) 
    }
    catch(error){
     return rejectWithValue({
      status : error.response.status,
      message:error.response.data.message
     })
    }
  } 
)  


export const fetchManufacturer = createAsyncThunk(
    "manufacturer/fetchManufacturer",
    async(_,{rejectWithValue}) =>{
        try{
      let response = await axios.get(BASE_URL + "/make/filter/");
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
    export const deleteManufacturer = createAsyncThunk(
      "manufacturer/deleteManufacture",
      async(id,{rejectWithValue})=>{
        try{
        let response = await axios.delete(BASE_URL+ "/make/" + id )
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
 const putManufacturer = createAsyncThunk(
  "manufacturer/putManufacturer",
  async (data, { rejectWithValue }) => {
    console.log("data",data)
    try {
      let response = await axios.put(BASE_URL + "/make/update/" + data.id,data.newData);
      if (response.status === 200 && response.data.success) {
        return response.data; }
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

const manufacturerSlice = createSlice({
    name:"manufacturer",
    initialState,
    reducers:{
  setSucceessStatus:(state,action)=>{
    state.status = "success";
   } 
    },
    
    extraReducers(builder){
      builder.addCase(postManufacturer.pending,(state,action) =>{
        state.status ="loading";
        state.error =null;
      });
      builder.addCase(postManufacturer.fulfilled,(state,action)=>{ 
        state.status ="added";
        state.error =null;
        state.manufacturer = state.manufacturer.concat(action.payload.make);
        state.message = action.payload.message
      } ) 
        builder.addCase(fetchManufacturer.pending,(state,action) =>{
            state.status ="loading";
            state.error= null;
        });
        builder.addCase(fetchManufacturer.fulfilled,(state,action)=>{
            state.status ="succeeded";
        state.error = null;
        state.manufacturer = action.payload.makeList; 
    });
        builder.addCase(fetchManufacturer.rejected,(state,action)=>{
       state.status ="error";
       state.error =   action.payload;
        }) 
        builder.addCase(putManufacturer.pending, (state) => {
          state.status = "loading";
          state.error = null;
        });
        builder.addCase(putManufacturer.fulfilled, (state, action) => {
          state.status = "updated";
          state.error = null;
              state.manufacturer = state.manufacturer.map((item) =>
       item._id === action.payload.data._id ? action.payload.data : item
  );
        });    
        builder.addCase(putManufacturer.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload;
        });
        builder.addCase(deleteManufacturer.pending,(state,action) =>{
          state.status = "loading";
          state.error = null;
        });
        builder.addCase(deleteManufacturer.fulfilled,(state,action) =>{
          state.status = "deleted";
          state.error = null;
          state.manufacturer = state.manufacturer.filter((item)=> item._id !== action.payload.id)
          state.message = action.payload.message
        })

        builder.addCase(deleteManufacturer.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload;
        });
    }
})

export const selectManufacturer = (state) => state.manufacturer.manufacturer;
export default manufacturerSlice.reducer;
export { putManufacturer };
