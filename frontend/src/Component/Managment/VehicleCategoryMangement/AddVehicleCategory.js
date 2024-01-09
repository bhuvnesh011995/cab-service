import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const url = BASE_URL+'/vehicleCategory/'
const api = BASE_URL+'/vehicleCategory/:id'


export default function AddVehicleCategory(){
  const [successMsg,setSuccessMsg] = useState("")
  const location = useLocation();
   
  const {id,vehicleCategory,status} = location.state;
   const [data,setData] = useState() 

   
      const {
        register,
        handleSubmit,
        reset,
        formState:{error}
      } = useForm();

      
  useEffect(() => {
    if (id) {
      reset({vehicleCategory,status});
    }

  }, []);
    
      const onSubmit = (formData,id,data) => {
        if (!id) {
        axios.post(url, formData)
            .then((response) => {
                if (response.data.success) setSuccessMsg(
                    <span style={{ backgroundColor: "lightgreen" }}>{response.data.message}</span>
                )
                else setSuccessMsg(
                    <span style={{ backgroundColor: "lightgreen" }}>{response.data.message}</span>
                )
            })
            .catch((error) => {
                setSuccessMsg(<h4 style={{ backgroundColor: "red" }}>{error.message}</h4>);
            });
          }
          else{
            axios.put(BASE_URL+'/vehicleCategory/'+id ,data)
            .then((response) => {
              if (response.data.success) {
                setSuccessMsg(
                  <span style={{ backgroundColor: "lightgreen" }}>{response.data.message}</span>
                );
              } else {
                setSuccessMsg(
                  <span style={{ backgroundColor: "lightgreen" }}>{response.data.message}</span>
                );
              }
            })
            .catch((error) => {
              setSuccessMsg(<h4 style={{ backgroundColor: "red" }}>{error.message}</h4>);
            });
          }
        }
 

    return(
        <Management_container
        title={"New Manufacturer"}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>                     
            <div class="card"  style={{width:'50%'}}>
        <div class="card-body">
        <form onSubmit={handleSubmit((formData) => onSubmit(formData,id,data))}>
       <div className="row">
        <div className="col-md-12">
        <div className="mb-4">
        <label for="formrow-firstname-input" className="form-label">
                  Category Vehicle
                </label>
              <input  type="text"  className="form-control select2-templating " style={{ width: "100%" }}  {...register("vehicleCategory",{required:"this is required field",onChange:(e)=>{setData((prevalue)=>({...prevalue,vehicleCategory:e.target.value})) }})}   />
            
            

            </div>
            
            </div>
            <div className="col-md-12">
                <div className="mb-4">
                <label for="formrow-firstname-input" className="form-label">
                  Status 
                </label>
                <select   className="form-control select2-templating " style={{ width: "100%" }}  {...register("status",{required:"this is required field",onChange:(e)=>{setData((prevalue)=>({...prevalue,status:e.target.value})) }})}>
              <option value={""}>
                     Select
                    </option>
                    
                        <option value={"ACTIVE"}>
                            ACTIVE
                    </option>
                    <option value={"INACTIVE"}>
                    INACTIVE

                    </option>
                </select>                    

                </div>
                </div>
       </div>
       <button type="submit" className="btn btn-success">
            SAVE
          </button>
          {successMsg}
       </form>
       </div>
        </div>
        </div>

        </Management_container>
        
    )
}