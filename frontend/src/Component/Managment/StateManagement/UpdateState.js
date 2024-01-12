import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
export default function UpdateState({show,setShow,data}){
    const [state,setState] = useState({...data})
    const [country,setCountry] = useState([])
    const [successMsg,setSuccessMsg] = useState();
    const navigate = useNavigate()

    useEffect(()=>{
      fetch(BASE_URL+"/country/",{
      method:"GET"
    }).then(res=>res.json())
    .then(data=>{
      setCountry(data)
    }
    )
  },[])

    const handleSubmit = (data) => {
    
        axios.put(BASE_URL + '/state/' + data.id, data)
          .then((response) => {
            if (response.data.success) {       
          toast.success(response.data.message)
          navigate(-1)   
            } else {
                toast.success(response.data.message)
                navigate(-1)   
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error updating model:", error);
          });
      };



    return (
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Update State </Modal.Title>
      </Modal.Header>

      <Modal.Body>  
              <form >
                <div className="row">
                <div className="col-md-12">
                <div className="mb-3">
                <label>Country</label>
                <select
                    name="country"
                    value={state.country || ""} 
                    className="form-control"
                    onChange={(e) => {
                      setState((prevValue) => ({ ...prevValue, country: e.target.value }));
                    }}
                  >
                    <option value="">Choose</option>
                    {country.map((item, i) => (
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
                        value={state.name|| ""}
                        className="form-control"
                        onChange={(e) => {
                            setState((prevValue) => ({ ...prevValue, name: e.target.value }));
                          }}
                      />
                    </div>
                  </div>
                
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>State Code :</label>
                      <input
                        type="text"
                        name="countryCode"
                        value= {state.stateCode}
                        className="form-control"
                        onChange={(e) => { setState((prevValue) => ({ ...prevValue, stateCode: e.target.value }))                         }}
                      />
                    </div>
                  </div>
                
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Status</label>
                      <select
                        name="status"
                        value={state.status}
                        className="form-control"
                        onChange={(e) => { setState((prevValue) => ({ ...prevValue, status: e.target.value }))  }}

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
                    handleClick={()=>handleSubmit(state)}
                    />
              </form>
              </Modal.Body>
              </Modal>
      );
    }
    