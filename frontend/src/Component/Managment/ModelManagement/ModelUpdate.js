import React, { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
export default function ModelUpdate({show,setShow,data}) {
  // const location = useLocation();
  // const data = location.state?.model || {};

  const [model, setModel] = useState({});
  const [options, setOptions] = useState([]);
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate()

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
  

console.log("options",options)

  const handleInputChange = (e) => {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <Modal size="lg" show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header  closeButton>
          <Modal.Title>
            Add Update Modal
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>                    
          <form >
          <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                <label>Manufacturer</label>
                <select
                    name="make"
                    value={model.make || ""} 
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">Choose</option>
                    {options.map((item, i) => (
                      <option key={i} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
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
          </Modal.Body>   
          </Modal>
  );
}
