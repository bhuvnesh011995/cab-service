import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

let initialInput = {
  img: "http://img.url.com",
  name: "",
  runModes: [],
  seatingCapacityName: "",
  seatingCapacity: null,
  status: "",
};

let url = BASE_URL + "/vehicletype/";
export default function AddVehicleType({show,setShow}) {
  const [vehicletype, setVehicleType] = useState(initialInput);
  const [options, setOptions] = useState();
  const [successMsg, setSuccessMsg] = useState();
    
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
          setOptions(arr);
        }
      });
  }, []);
  const navigate = useNavigate();
  // let optionList = options?.map((ele, i) => {
  //   return (
  //     <option key={i} value={ele}>
  //       {ele.toLowerCase()}
  //     </option>
  //   );
  // });

  function handleChange(e) {
    let runModes = [];
    for (let ele in e) {
      console.log(ele);
      runModes.push(e[ele].value);
    }
    setVehicleType((preVal) => ({ ...preVal, runModes }));
    // for(let i=0;i<e.target.options.length;i++){
    //     if(e.target.options[i].selected){
    //         value.push(e.target.options[i].value)
    //     }
    // }
    // setVehicleType(preVal=>({...preVal,runModes:value}))
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      body: JSON.stringify(vehicletype),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setShow(false)
        } else toast.error(data.message);
      })
      .catch((e) => toast.error("error while added vehicle type"));
  }

  return (
           <Modal size="lg" show={show} onHide={()=>{setShow(false)}}>    
                     <Modal.Header closeButton>
                  <Modal.Title>
                    Add New Vehicle Type
                  </Modal.Title>
                     </Modal.Header>
                     <Modal.Body>                  
           <form>
           <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                <label>file</label>
                <input
                        className="form-control form-control-sm"
                        type="file"
                      />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, name: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">

                    <label>Run Modes</label>
                <ReactSelect
                    options={options}
                    isMulti   
                    onChange={handleChange}
                   />                </div>

              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Seating Name :</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, seatingCapacityName: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Seating Capacity :</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => {
                      setVehicleType((prevValue) => ({ ...prevValue, seatingCapacity: e.target.value }));
                    }}                                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
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
                <BtnDark title={"Add"} handleClick={handleSubmit} />
                {successMsg}
              </form>
              </Modal.Body>
              </Modal>
  );
}
