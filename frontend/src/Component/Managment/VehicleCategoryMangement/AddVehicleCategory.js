import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useForm } from "react-hook-form";

const url = BASE_URL+'/make/'

export default function AddVehicleCategory(){
  
     
      const {
        register,
        handleSubmit,
        formState:{error}
      } = useForm();
    
      const onSubmit =(data)=>{
       console.log("data",data)
    }
      
 

    return(
        <Management_container
        title={"New Manufacturer"}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>                     
            <div class="card"  style={{width:'50%'}}>
        <div class="card-body">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
       <div className="row">
        <div className="col-md-12">
        <div className="mb-4">
        <label for="formrow-firstname-input" className="form-label">
                  Category Vehicle
                </label>
              <select   className="form-control select2-templating " style={{ width: "100%" }}  {...register("vehicleCategory")}>
              <option value={""}>
                     Select
                    </option>
                    
                        <option value={"CNC"}>
                    CNG
                    </option>
                    <option value={"Diesel"}>
                    Diesel
                    </option>
                <option value={"Petrol"}>
                    Petrol
                    </option>
                    <opton value={"EV"}>
                        EV
                    </opton>
                </select>                
            

            </div>
            
            </div>
            <div className="col-md-12">
                <div className="mb-4">
                <label for="formrow-firstname-input" className="form-label">
                  Status 
                </label>
                <select   className="form-control select2-templating " style={{ width: "100%" }} {...register("status")}>
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
       </form>
       </div>
        </div>
        </div>

        </Management_container>
        
    )
}