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
export default function UpdateCountry(){
    const location = useLocation();
    const data = location.state?.data || {};
    const [country,setCountry] = useState({...data})
    const [successMsg,setSuccessMsg] = useState();
    const navigate = useNavigate()

    const handleSubmit = (data) => {
    
        axios.put(BASE_URL + '/country/' + data.id, data)
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
        <Management_container title={"Update Country"}>
          <div className="card mx-auto" style={{ width: "50%" }}>
            <div className="card-body">
              <form >
                <div className="row">
                
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={country.name|| ""}
                        className="form-control"
                        onChange={(e) => {
                            setCountry((prevValue) => ({ ...prevValue, name: e.target.value }));
                          }}
                      />
                    </div>
                  </div>
                
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Country Code :</label>
                      <input
                        type="text"
                        name="countryCode"
                        value= {country.countryCode}
                        className="form-control"
                        onChange={(e) => { setCountry((prevValue) => ({ ...prevValue, countryCode: e.target.value }))                         }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>dial Code:</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={country.dialCode}
                        onChange={(e) => { setCountry((prevValue) => ({ ...prevValue, dialCode: e.target.value }))                         }}

                                                         />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label>Status</label>
                      <select
                        name="status"
                        value={country.status}
                        className="form-control"
                        onChange={(e) => { setCountry((prevValue) => ({ ...prevValue, status: e.target.value }))  }}

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
                    handleClick={()=>handleSubmit(country)}
                    />
              </form>
            </div>
          </div>
        </Management_container>
      );
    }
    