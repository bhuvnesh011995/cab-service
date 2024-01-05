import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useForm } from "react-hook-form";
import axios from "axios";

const url = BASE_URL+'/vehicleCategory/'

export default function AddVehicleCategory(){
  const [successMsg,setSuccessMsg] = useState("")

     
      const {
        register,
        handleSubmit,
        formState:{error}
      } = useForm();
    
      const onSubmit = (data) => {
        console.log("data", data);
        axios.post(url, data)
            .then((response) => {
                // Corrected this block
                if (response.data.success) setSuccessMsg(
                    <span style={{ backgroundColor: "lightgreen" }}>{response.data.message}</span>
                )
                else setSuccessMsg(
                    <span style={{ backgroundColor: "red" }}>{response.data.message}</span>
                )
            })
            .catch((error) => {
                setSuccessMsg(<h4 style={{ backgroundColor: "red" }}>{error.message}</h4>);
            });
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
              <input  type="text"  className="form-control select2-templating " style={{ width: "100%" }}  {...register("vehicleCategory")}/>
            
            

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
          {successMsg}
       </form>
       </div>
        </div>
        </div>

        </Management_container>
        
    )
}