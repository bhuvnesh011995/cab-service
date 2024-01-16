import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVehicleCategory, updateVehicleCategory } from "../../../Redux/features/vehicleCategoryReducer";
const url = BASE_URL+'/vehicleCategory/'
const api = BASE_URL+'/vehicleCategory/:id'

export default function AddVehicleCategory({show,setShow,viewData,  setViewData,
}){
  const [successMsg,setSuccessMsg] = useState("")
  const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch()
  const {id,vehicleCategory,status} = location.state  || {};
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

  useEffect(() => {
    if (viewData) {
      reset(viewData);
    }
    return () => {
      setViewData(null);
    };
  }, []);
 
      const onSubmit = (formData,id,data) => {
        if (!viewData) {
          dispatch(addVehicleCategory(formData))
          }
          else{
            const { _id } = viewData;
            dispatch(updateVehicleCategory({ id: _id, newData: formData }));

          }
        }
 

    return(
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New VehicleCategory </Modal.Title>
      </Modal.Header>

      <Modal.Body>          
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
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
       </Modal.Body>
       </Modal>
          
    )
}