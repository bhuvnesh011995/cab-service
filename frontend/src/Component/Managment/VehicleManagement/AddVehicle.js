import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  plateNo: "",
  vehicleType: "",
  make: "",
  model: "",
  seatingCapacityName: "",
  seatingCapacity: null,
  year: "",
  color: "",
  fuelType: "",
  registration: { number: "", expiryDate: "", verified: null },
  insurance: { expiryDate: "", verified: null },
  permit: { expiryDate: "", verified: null },
  pollutionCertificate: { expiryDate: "", verified: null },
  status: "",
  verified: "",
};
export default function AddVehicle() {
  const [vehicletypeOption, setVehicletypeOption] = useState([]);
  const [makeOption, setMakeOption] = useState([]);

  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [vehicle, setVehicle] = useState({
    ...initialState,
    driverEmail: state?.email,
  });

  useEffect(() => {
    fetch(BASE_URL + "/vehicletype/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        if (data.success) {
          data.data.map((ele) => arr.push(ele.name));
          setVehicletypeOption(arr);
        }
      });

    fetch(BASE_URL + "/make/", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.map((ele) => arr.push(ele.name));
        setMakeOption(arr);
      });
  }, []);

  function handleSubmit() {
    fetch(BASE_URL + "/vehicle", {
      method: "POST",
      body: JSON.stringify(vehicle),
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
          setTimeout(() => navigate(-1), 2000);
        } else {
          setSuccMsg(
            <span style={{ backgroundColor: "red" }}>{data.message}</span>
          );
        }
      });
  }

  function handleCancel() {}
  return (
    <Management_container title={"Vehicle Form"}>
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
              <form>
                <div className="d-flex justify-content-space-around flex-wrap">
                  <div class="m-3">
                    <label class="form-label">Driver Email</label>
                    <input
                      disabled={true}
                      class="form-control"
                      type={"text"}
                      value={state.email}
                    />
                  </div>
                  <Text_Input
                    input={vehicle}
                    lebel_text={"Plate No : "}
                    setInput={setVehicle}
                    setKey={"plateNo"}
                  />
                  <Selection_Input
                    options={vehicletypeOption}
                    input={vehicle}
                    setInput={setVehicle}
                    lebel_text={"VehicleType : "}
                    setKey={"vehicleType"}
                  />
                  <Selection_Input
                    options={makeOption}
                    input={vehicle}
                    setInput={setVehicle}
                    lebel_text={"Make : "}
                    setKey={"make"}
                  />
                  <Text_Input
                    input={vehicle}
                    lebel_text={"Model : "}
                    setInput={setVehicle}
                    setKey={"model"}
                  />
                  <Selection_Input
                    options={[
                      "petrol",
                      "piesel",
                      "plectric vehicles",
                      "cng",
                      "ethanol or methanol",
                      "gasoline",
                      "bio-diesel",
                      "lpg",
                    ]}
                    input={vehicle}
                    setInput={setVehicle}
                    lebel_text={"Fuel Type : "}
                    setKey={"fuelType"}
                  />
                  <Text_Input
                    input={vehicle}
                    lebel_text={"Seating Capacity Name : "}
                    setInput={setVehicle}
                    setKey={"seatingCapacityName"}
                  />
                  <Text_Input
                    type={"number"}
                    input={vehicle}
                    lebel_text={"Seating Capacity: "}
                    setInput={setVehicle}
                    setKey={"seatingCapacity"}
                  />
                  <Selection_Input
                    options={[
                      "Black",
                      "White",
                      "Silver",
                      "Gray",
                      "Red",
                      "Blue",
                      "Green",
                      "Yellow",
                      "Orange",
                      "Purple",
                      "Brown",
                      "Gold",
                      "Beige",
                      "Pink",
                      "Turquoise",
                      "Magenta",
                      "Cyan",
                      "Lime",
                      "Indigo",
                      "Teal",
                      "Olive",
                      "Maroon",
                      "Navy",
                      "Charcoal",
                      "Slate",
                      "Sky Blue",
                      "Chocolate",
                      "Ruby",
                      "Emerald",
                      "Sapphire",
                      "Amethyst",
                      "Topaz",
                      "Pearl",
                      "Ivory",
                      "Champagne",
                      "Rose",
                      "Crimson",
                      "Aqua",
                      "Mint",
                      "Lavender",
                      "Coral",
                      "Violet",
                      "Tangerine",
                      "Sunset",
                      "Plum",
                      "Steel",
                      "Bronze",
                      "Copper",
                      "Mahogany",
                      "Sandalwood",
                      "Rust",
                      "Moss",
                      "Honey",
                      "Ocean",
                      "Forest",
                      "Midnight",
                      "Orchid",
                      "Smoke",
                      "Graphite",
                      "Sienna",
                    ]}
                    input={vehicle}
                    setInput={setVehicle}
                    lebel_text={"Color : "}
                    setKey={"color"}
                  />
                  <div class="m-3">
                    <label class="form-label">Year</label>
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter Year"
                      min={2000}
                      max={new Date().getFullYear()}
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          year: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Selection_Input
                    options={["ACTIVE", "INACTIVE"]}
                    input={vehicle}
                    setInput={setVehicle}
                    lebel_text={"Status : "}
                    setKey={"status"}
                  />
                  <div class="m-3">
                    <input
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          verified: e.target.checked,
                        }))
                      }
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Verify</label>
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
                    <label class="form-label">Vehicle Registration</label>
                    <input
                      class=" m-2 form-control"
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          registration: {
                            ...preVal.registration,
                            number: e.target.value,
                          },
                        }))
                      }
                      type="text"
                      placeholder="Enter Registration Number"
                    />
                    <input className=" m-2 form-control" type="file" />
                  </div>
                  <div class="m-3">
                    <label class="form-label">Registration Expiry Date</label>
                    <input
                      class=" m-2 form-control"
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          registration: {
                            ...preVal.registration,
                            expiryDate: e.target.value,
                          },
                        }))
                      }
                      type="date"
                    />
                  </div>
                  <div class="m-3">
                    <input
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          registration: {
                            ...preVal.registration,
                            verified: e.target.checked,
                          },
                        }))
                      }
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Verify</label>
                  </div>
                </div>
                <div className="d-flex justify-content-space-around flex-wrap">
                  <div class="m-3">
                    <label class="form-label">Vehicle Insurance</label>
                    <p>Expiry Date</p>
                    <input
                      class=" m-2 form-control"
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          insurance: {
                            ...preVal.insurance,
                            expiryDate: e.target.value,
                          },
                        }))
                      }
                      type="date"
                      placeholder="Enter expiry Date"
                    />
                    <input className=" m-2 form-control" type="file" />
                  </div>
                  <div class="m-3">
                    <input
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          insurance: {
                            ...preVal.insurance,
                            verified: e.target.checked,
                          },
                        }))
                      }
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Verify</label>
                  </div>
                </div>
                <div className="d-flex justify-content-space-around flex-wrap">
                  <div class="m-3">
                    <label class="form-label">Vehicle Permit</label>
                    <p>Expiry Date</p>
                    <input
                      class=" m-2 form-control"
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          permit: {
                            ...preVal.permit,
                            expiryDate: e.target.value,
                          },
                        }))
                      }
                      type="date"
                      placeholder="Enter expiry Date"
                    />
                    <input className=" m-2 form-control" type="file" />
                  </div>
                  <div class="m-3">
                    <input
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          permit: {
                            ...preVal.permit,
                            verified: e.target.checked,
                          },
                        }))
                      }
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Verify</label>
                  </div>
                </div>
                <div className="d-flex justify-content-space-around flex-wrap">
                  <div class="m-3">
                    <label class="form-label">Pollution Certification</label>
                    <p>Expiry Date</p>
                    <input
                      class=" m-2 form-control"
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          pollutionCertificate: {
                            ...preVal.pollutionCertificate,
                            expiryDate: e.target.value,
                          },
                        }))
                      }
                      type="date"
                      placeholder="Enter expiry Date"
                    />
                    <input className=" m-2 form-control" type="file" />
                  </div>
                  <div class="m-3">
                    <input
                      onChange={(e) =>
                        setVehicle((preVal) => ({
                          ...preVal,
                          pollutionCertificate: {
                            ...preVal.pollutionCertificate,
                            verified: e.target.checked,
                          },
                        }))
                      }
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Verify</label>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BtnDark title={"Add Vehicle"} handleClick={handleSubmit} />
              <BtnDark title={"Cancel"} handleClick={handleCancel} />
              {succMsg}
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
