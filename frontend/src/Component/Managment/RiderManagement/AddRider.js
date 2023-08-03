import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  DOB: "",
  password: "",
  country: "",
  state: "",
  city: "",
  place: "",
  pincode: "",
  gender: "",
};

export default function AddRider() {
  const [rider, setRider] = useState(initialState);
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
    fetch(BASE_URL + "/state/?country=" + rider.country, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((ele) => arr.push(ele.name));
        setStateOption(arr);
      });
  }, [rider.country]);

  useEffect(() => {
    if (rider.country && rider.state) {
      fetch(BASE_URL + `/city/${rider.country}/${rider.state}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.cities.forEach((ele) => arr.push(ele.name));
          setCityOption(arr);
        });
    } else setCityOption([]);
  }, [rider.country, rider.state]);

  function handleSubmit() {
    fetch(BASE_URL + "/rider/", {
      method: "POST",
      body: JSON.stringify(rider),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccMsg(
            <span style={{ backgroundColor: "lightgreen" }}>
              {data.message}
            </span>
          );
          setTimeout(() => navigate("/riderManagement"), 2000);
        } else {
          setSuccMsg(
            <span style={{ backgroundColor: "red" }}>{data.message}</span>
          );
        }
      });
  }

  function handleCancel() {
    navigate("/riderManagement");
  }

  return (
    <Management_container title={"Rider Det"}>
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
              <form className="d-flex justify-content-space-around flex-wrap">
                <div className="col" style={{ width: "100px" }}>
                  <img
                    className="row"
                    style={{ height: "100px", width: "100px" }}
                  />
                  <button>Upload</button>
                </div>
                <Text_Input
                  input={rider}
                  lebel_text={"First Name : "}
                  setInput={setRider}
                  setKey={"firstName"}
                />
                <Text_Input
                  input={rider}
                  lebel_text={"Last Name : "}
                  setInput={setRider}
                  setKey={"lastName"}
                />

                <div class="m-3">
                  <label class="form-label">ID :</label>
                  <input
                    class="form-control"
                    disabled="true"
                    type={"text"}
                    placeholder={"id"}
                    // value={input[setKey]}
                  />
                </div>
                <Text_Input
                  input={rider}
                  lebel_text={"Email : "}
                  setInput={setRider}
                  setKey={"email"}
                />
                <Text_Input
                  input={rider}
                  lebel_text={"Mobile No : "}
                  setInput={setRider}
                  setKey={"mobile"}
                />
                <Text_Input
                  type={"password"}
                  input={rider}
                  lebel_text={"Password : "}
                  setInput={setRider}
                  setKey={"password"}
                />
                <Text_Input
                  type={"date"}
                  input={rider}
                  lebel_text={"Date Of Birth : "}
                  setInput={setRider}
                  setKey={"email"}
                />
                <Selection_Input
                  options={countryOption}
                  input={rider}
                  setInput={setRider}
                  lebel_text={"Country : "}
                  setKey={"country"}
                  reset={["state", "city"]}
                />
                <Selection_Input
                  options={stateOption}
                  input={rider}
                  setInput={setRider}
                  lebel_text={"State : "}
                  setKey={"state"}
                  reset={["city"]}
                />
                <Selection_Input
                  options={cityOption}
                  input={rider}
                  setInput={setRider}
                  lebel_text={"City : "}
                  setKey={"city"}
                />
                <Text_Input
                  input={rider}
                  lebel_text={"Address : "}
                  setInput={setRider}
                  setKey={"place"}
                />
                <Text_Input
                  input={rider}
                  lebel_text={"Pincode : "}
                  setInput={setRider}
                  setKey={"pincode"}
                />
                <Selection_Input
                  options={["MALE", "FEMALE"]}
                  input={rider}
                  setInput={setRider}
                  lebel_text={"Gender : "}
                  setKey={"gender"}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={rider}
                  setInput={setRider}
                  lebel_text={"Status : "}
                  setKey={"status"}
                />
                <div class="m-3">
                  <label class="form-label">Login Device</label>
                  <input class="form-control" disabled="true" type={"text"} />
                </div>
                <div class="m-3">
                  <label class="form-label">Last Login Activity</label>
                  <input class="form-control" disabled="true" type={"text"} />
                </div>
                <div class="m-3">
                  <label class="form-label">Last Password Change Date</label>
                  <input class="form-control" disabled="true" type={"text"} />
                </div>
                <div class="m-3">
                  <label class="form-label">Remark</label>
                  <input class="form-control" disabled="true" type={"text"} />
                </div>
                <div style={{ width: "90%" }} class="m-3">
                  <label class="form-label">Details</label>
                  <input class="form-control" disabled="true" type={"text"} />
                </div>
              </form>
            </div>
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BtnDark title={"Add Rider"} handleClick={handleSubmit} />
              <BtnDark title={"Cancel"} handleClick={handleCancel} />
              {succMsg}
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
