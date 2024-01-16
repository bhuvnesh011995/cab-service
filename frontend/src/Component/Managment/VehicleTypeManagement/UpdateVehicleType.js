import React, { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
export default function UpdateVehicleType({show,setShow,data}) {


  const [vehicleType, setVehicleType] = useState({...data});
  const [runMode, setRunMode] = useState([]);


  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate()
  console.log("dtt",data)

  useEffect(() => {
    fetch(BASE_URL + "/runMode/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.data?.map((ele) =>
            arr.push({ value: ele._id, label: ele.name })
          );
          setRunMode(arr);
        }
      });
  }, []);

 

  const handleSubmit = (data) => {
    
    axios.put(BASE_URL + '/vehicletype/' + data.id, data)
      .then((response) => {
        if (response.data.success) {       
      toast.success(response.data.message)
      navigate(-1)   
        } else {
            toast.success(response.data.message)
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating model:", error);
      });
  };

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setVehicleType((prevValue) => ({ ...prevValue, runMode: selectedValues }));
  };

  return (
    <Modal size="lg" show={show} onHide={()=>{setShow(false)}}>    
    <Modal.Header closeButton>
 <Modal.Title>
   Add Update Vehicle Type
 </Modal.Title>
    </Modal.Header>
    <Modal.Body>     
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                <label>files</label>
                <input
                        className="form-control form-control-sm"
                        type="file"
                      />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={vehicleType.name || ""}
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, name: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">

                    <label></label>
                <ReactSelect
                    options={runMode}
                    isMulti
                    value={runMode.filter(
                      (option) => vehicleType.runMode.indexOf(option.value) !== -1
                    )}
                    onChange={handleChange}
                   />                </div>

              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Seating Name :</label>
                  <input
                    type="text"
                    name="name"
                    value={vehicleType.seatingCapacityName || ""}
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, seatingCapacityName: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Seating Capacity :</label>
                  <input
                    type="text"
                    name="name"
                    value={vehicleType.seatingCapacity || ""}
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, seatingCapacity: e.target.value }));
                    }}                                    />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    value={vehicleType.status || ""}
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, status: e.target.value }));
                    }}    
                  >
                    <option>Choose</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
            <BtnDark
                title={"Add"}
                handleClick={()=>handleSubmit(vehicleType)}
                />
          </form>
          </Modal.Body>
              </Modal>
  );
}
