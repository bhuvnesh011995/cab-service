import React, { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
export default function UpdateVehicleType() {
  const location = useLocation();
  const data = location.state?.model || {};

  const [model, setModel] = useState({});
  const [options, setOptions] = useState([]);
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

  useEffect(() => {
    setModel(data);
    fetch(BASE_URL + "/make/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  }, [data]);

  const handleSubmit = (data) => {
    
    axios.put(BASE_URL + '/model/' + data.id, data)
      .then((response) => {
        if (response.data.success) {       
      toast.success(response.data.message)
      navigate(-1)   
        } else {
            toast.error(response.data.message)
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating model:", error);
      });
  };
  function handleChange(e) {
    let runModes = [];
    for (let ele in e) {
      console.log(ele);
      runModes.push(e[ele].value);
    }
    setModel((preVal) => ({ ...preVal, runModes }));
  }


  const handleInputChange = (e) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Management_container title={"Update VehicleType"}>
      <div className="card mx-auto" style={{ width: "50%" }}>
        <div className="card-body">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                <label>Manufacturer</label>
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
                    value={model.name || ""}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                    <label></label>
                <ReactSelect
                    options={runMode}
                    isMulti
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Seating Name :</label>
                  <input
                    type="text"
                    name="name"
                    value={model.seatingCapacityName || ""}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Seating Capacity :</label>
                  <input
                    type="text"
                    name="name"
                    value={model.seatingCapacity || ""}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    value={model.status || ""}
                    className="form-control"
                    onChange={handleInputChange}
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
                handleClick={()=>handleSubmit(model)}
                />
          </form>
        </div>
      </div>
    </Management_container>
  );
}
