import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import BASE_URL from "../../../config/config";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addModel } from "../../../Redux/features/ModelReducer";
import { useDispatch } from "react-redux";

export default function AddModel({show,setShow,data}) {
  const [model, setModel] = useState({});
  const [options, setOptions] = useState([]);
  const [succMsg, setSuccMsg] = useState("");
  const dispatch = useDispatch()


  const {
     register,
     handleSubmit,
     reset,
     formState:{error}
  } = useForm()

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

  const onSubmit =(data)=>{
    dispatch(addModel(data))
  }


  return (
      <Modal size="lg" show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header  closeButton>
          <Modal.Title>
            Add Update Modal
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>                    
          <form   onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                <label>Manufacturer</label>
                <select
                    name="make"
                    className="form-control"
                        {...register("make") }
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
                    {...register("name") }
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    {...register('status')}
                    className="form-control"
                  >
                    <option>Choose</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
            <button  type="submit" class="btn btn-success" >
                  Save
                </button>
          </form>
          
          </Modal.Body>   
          </Modal>
  );
}
