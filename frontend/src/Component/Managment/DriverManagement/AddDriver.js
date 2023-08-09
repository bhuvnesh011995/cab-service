import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";

const initialState ={
    firstName:"",
    lastName:"",
    email:"",
    mobile:null,
    DOB:"",
    password:"",
    referralCode:null,
    country:"",
    state:"",
    city:"",
    place:"",
    pincode:"",
    license:{number:null,expiryDate:"",verified:null},
    pan:{number:null,verified:null},
    aadhar:{number:null,verified:null},
    verified:null
}

export default function AddDriver(){
    const [driver,setDriver] = useState(initialState);
    let [countryOption, setCountryOption] = useState([]);
    let [stateOption, setStateOption] = useState([]);
    let [cityOption, setCityOption] = useState([]);
    const [succMsg, setSuccMsg] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetch(BASE_URL + "/country/", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            let arr = [];
            data.forEach((ele) => arr.push(ele.name));
            setCountryOption(arr);
          });
      }, []);

      useEffect(() => {
        fetch(BASE_URL + "/state/?country=" + driver.country, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            let arr = [];
            data.forEach((ele) => arr.push(ele.name));
            setStateOption(arr);
          });
      }, [driver.country]);

      useEffect(() => {
        if (driver.country && driver.state) {
          fetch(BASE_URL + `/city/${driver.country}/${driver.state}`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              let arr = [];
              data.cities.forEach((ele) => arr.push(ele.name));
              setCityOption(arr);
            });
        } else setCityOption([]);
      }, [driver.country, driver.state]);

      function handleSubmit(){

        fetch(BASE_URL+"/driver/",{
            method:"POST",
            body:JSON.stringify(driver),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res=>res.json())
        .then(data=>{
            if (data.success) {
                setSuccMsg(
                  <span style={{ backgroundColor: "lightgreen" }}>
                    {data.message}
                  </span>
                );
                setTimeout(() => navigate("/driverManagement"), 2000);
              } else {
                setSuccMsg(
                  <span style={{ backgroundColor: "red" }}>{data.message}</span>
                );
              }
        })

      }

      function handleCancel(){
        navigate("/driverManagement")
      }

      

    return(
        <Management_container title={"Driver det"}>
            <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-lg-10">
          <div class="card">
            <div class="card-body">
              <form >
                <div className="d-flex justify-content-space-around flex-wrap">
              <Text_Input
                  input={driver}
                  lebel_text={"First Name : "}
                  setInput={setDriver}
                  setKey={"firstName"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Last Name : "}
                  setInput={setDriver}
                  setKey={"lastName"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Email : "}
                  setInput={setDriver}
                  setKey={"email"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Mobile No : "}
                  setInput={setDriver}
                  setKey={"mobile"}
                />
                <Text_Input
                  type={"password"}
                  input={driver}
                  lebel_text={"Password : "}
                  setInput={setDriver}
                  setKey={"password"}
                />
                <Text_Input
                  type={"date"}
                  input={driver}
                  lebel_text={"Date Of Birth : "}
                  setInput={setDriver}
                  setKey={"DOB"}
                />
                <Selection_Input
                  options={countryOption}
                  input={driver}
                  setInput={setDriver}
                  lebel_text={"Country : "}
                  setKey={"country"}
                  reset={["state", "city"]}
                />
                <Selection_Input
                  options={stateOption}
                  input={driver}
                  setInput={setDriver}
                  lebel_text={"State : "}
                  setKey={"state"}
                  reset={["city"]}
                />
                <Selection_Input
                  options={cityOption}
                  input={driver}
                  setInput={setDriver}
                  lebel_text={"City : "}
                  setKey={"city"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Address : "}
                  setInput={setDriver}
                  setKey={"place"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Pincode : "}
                  setInput={setDriver}
                  setKey={"pincode"}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={driver}
                  setInput={setDriver}
                  lebel_text={"Status : "}
                  setKey={"status"}
                />
                <Text_Input
                  input={driver}
                  lebel_text={"Used Referral : "}
                  setInput={setDriver}
                  setKey={"referralCode"}
                />
                <div class="m-3">
                  <input
                  onChange={e=>setDriver(preVal=>({...preVal,verified:e.target.checked}))}
                    class="form-check-input"
                    type="checkbox"
                  /><label class="form-check-label">Verify</label>
                </div>
                </div>
                <div className="col m-3" style={{ width: "100px" }}>
                <img
                    className="row"
                    style={{ height: "100px", width: "100px" }}
                  />
                  <input type="file" className="form-control m-1" />
                </div>
                <div className="d-flex justify-content-space-around flex-wrap">
                <div class="m-3">
      <label class="form-label">
        License
      </label>
        <input class=" m-2 form-control" onChange={e=>setDriver(preVal=>({...preVal,license:{...preVal.license,number:e.target.value}}))}
          type="text"
          placeholder="Enter License Number"
        />
        <input className=" m-2 form-control" type="file" />
    </div>
    <div class="m-3">
      <label class="form-label">
        Expiry Date
      </label>
        <input class=" m-2 form-control" onChange={e=>setDriver(preVal=>({...preVal,license:{...preVal.license,expiryDate:e.target.value}}))}
          type="date"
        />
    </div>
    <div class="m-3">
                  <input
                  onChange={e=>setDriver(preVal=>({...preVal,license:{...preVal.license,verified:e.target.checked}}))}
                    class="form-check-input"
                    type="checkbox"
                  /><label class="form-check-label">Verify</label>
                </div>
                </div>

                <div className="d-flex justify-content-space-around flex-wrap">
                <div class="m-3">
      <label class="form-label">
        Aadhar
      </label>
        <input class=" m-2 form-control" onChange={e=>setDriver(preVal=>({...preVal,aadhar:{...preVal.aadhar,number:e.target.value}}))}
          type="number"
          placeholder="Enter Aadhar Number"
        />
        <input className=" m-2 form-control" type="file" />
    </div><div class="m-3">
                  <input
                  onChange={e=>setDriver(preVal=>({...preVal,aadhar:{...preVal.aadhar,verified:e.target.checked}}))}
                    class="form-check-input"
                    type="checkbox"
                  /><label class="form-check-label">Verify</label>
                </div>
                </div>

                <div className="d-flex justify-content-space-around flex-wrap">
                
                <div class="m-3">
      <label class="form-label">
        Pan
      </label>
        <input class=" m-2 form-control" onChange={e=>setDriver(preVal=>({...preVal,pan:{...preVal.pan,number:e.target.value}}))}
          type="text"
          placeholder="Enter Pan Number"
        />
        <input className=" m-2 form-control" type="file" />
    </div><div class="m-3">
                  <input
                  onChange={e=>setDriver(preVal=>({...preVal,pan:{...preVal.pan,verified:e.target.checked}}))}
                    class="form-check-input"
                    type="checkbox"
                  /><label class="form-check-label">Verify</label>
                </div>
        </div>
              </form>
              </div>
              <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BtnDark title={"Add Driver"} handleClick={handleSubmit} />
              <BtnDark title={"Cancel"} handleClick={handleCancel} />
              {succMsg}
            </div>
              </div></div></div>
        </Management_container>
    )
}