import { useCallback, useEffect, useState } from "react";
import VehicletypeCheckbox from "./VehicleTypeCheckbox";
import BASE_URL from "../../../config/config";
import { Col, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVehicleType,
  getVehicleTypes,
} from "../../../Redux/features/vehicleTypeReducer";
import { Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleTypes } from "../../../Redux/features/vehicleTypeReducer";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import {
  emptyStates,
  fetchStates,
  getStates,
} from "../../../Redux/features/stateReducer";
import Map from "./Map";
import { toast } from "react-toastify";
import { addCity } from "../../../Redux/features/cityReducer";

let initialInput = {
  name: "",
  country: "",
  state: "",
  status: "",
  utcOffset: "",
  vehicleService: [],
};

let countries = [];
let states = [];

export default function AddCity() {
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(initialInput);
  const [state, setState] = useState();
  const [vehicleService, setVehicleService] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const url = BASE_URL + "/city/";
  useEffect(() => {
    fetch(BASE_URL + "/country/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((ele) => arr.push(ele.name));
        setOptions(arr);
      });

    fetch(BASE_URL + "/vehicletype/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          let arr = data?.vehicleType?.map((ele, i) => {
            let runMode = ele.runMode?.map((ele, i) => {
              return (
                <div key={i} class="form-check form-check-primary mb-3">
                  <input class="form-check-input" type="checkbox" />
                  <label class="form-check-label">{ele.name}</label>
                </div>
              );
            });
            return (
              <VehicletypeCheckbox
                setCity={setCity}
                city={city}
                ele={ele}
                i={i}
                runMode={runMode}
              />
            );
          });
          setVehicleService(arr);
        }
      });
  }, []);

  useEffect(() => {
    if (city.country) {
      fetch(BASE_URL + "/state/?country=" + city.country, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.forEach((ele) => arr.push(ele.name));
          setState(arr);
        });
    } else setState([]);
  }, [city.country]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify(city),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success)
          setSuccessMsg(
            <div style={{ backgroundColor: "lightgreen" }}>{data.message}</div>
          );
        else
          setSuccessMsg(
            <div style={{ backgroundColor: "red" }}>{data.message}</div>
          );
      })
      .catch((e) =>
        setSuccessMsg(<div style={{ backgroundColor: "red" }}>{e.message}</div>)
      );
  }
  return (
    <Management_container title={"Add City"}>
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
                <div class="row">
                  <Selection_Input
                    options={options}
                    setInput={setCity}
                    input={city}
                    lebel_text={"Country : "}
                    setKey={"country"}
                  />
                  <Selection_Input
                    options={state}
                    setInput={setCity}
                    input={city}
                    lebel_text={"State : "}
                    setKey={"state"}
                  />
                </div>
                <Text_Input
                  input={city}
                  lebel_text={"Name :"}
                  setKey={"name"}
                  setInput={setCity}
                />
                <Text_Input
                  input={city}
                  lebel_text={"UTCOffset :"}
                  setKey={"utcOffset"}
                  setInput={setCity}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={city}
                  setInput={setCity}
                  lebel_text={"Status : "}
                  setKey={"status"}
                />
              </form>

              <div>
                {" "}
                <label>Vehicle Service</label>
                {vehicleService}
              </div>
              <BtnDark handleClick={handleSubmit} title={"Add City"} />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}

export const AddNewCity = function ({ show, setShow }) {
  const [path, setPath] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState();
  const dispatch = useDispatch();
  const vehicleTypes = useSelector(
    (state) => state?.vehicleType?.vehicleType || []
  );

  const countries = useSelector(getCountries);
  const states = useSelector(getStates);

  const onSubmit = useCallback(
    (data) => {
      let hasRunMode = false;

      let cityService = data.runMode.map((item) => {
        let vehiTypeId = Object.keys(item)[0];
        let runMode = [];
        let runModes = Object.keys(item[vehiTypeId]);
        runModes.forEach((ele) => {
          if (item[vehiTypeId][ele]) {
            runMode.push(ele);
            hasRunMode = true;
          }
        });
        return {
          vehicleType: vehiTypeId,
          runMode,
        };
      });

      let newData = {
        name: data.name,
        cityService,
        country: data.country,
        state: data.state,
        utcOffset: data.utcOffset,
        territory: path,
      };
      if (!hasRunMode) return toast.error("selct at least one service");
      if (path.length < 3) return toast.error("set city territory");
      dispatch(addCity(newData));
    },
    [dirtyFields, isDirty, path]
  );

  useEffect(() => {
    if (ready) {
      if (watch("country")) {
        dispatch(fetchStates(watch("country")));
      } else {
        dispatch(emptyStates());
      }
    }
  }, [watch("country"), ready]);

  useEffect(() => {
    if (ready) {
      dispatch(fetchCountries());
      dispatch(getVehicleTypes());
    } else setReady(true);
  }, [ready]);

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Add City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Row className="align-items-center mb-3">
                <div className="col-sm-4">
                  <label htmlFor="name" className="form-label">
                    Name :
                  </label>{" "}
                </div>
                <div className="col-sm-8">
                  <input
                    {...register("name", {
                      required: "this is required field",
                    })}
                    type="text"
                    placeholder="Enter City Name"
                    className="form-control"
                  />
                </div>
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </Row>

              <Row className="align-items-center mb-3">
                <div className="col-sm-4">
                  <label className="form-label" htmlFor="country">
                    Country :
                  </label>
                </div>
                <div className="col-sm-8">
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className="form-control">
                        <option value={""}>Choose...</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country._id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                {errors.country && (
                  <span style={{ color: "red" }}>{errors.country.message}</span>
                )}
              </Row>
              <Row className="align-items-center mb-3">
                <div className="col-sm-4">
                  <label className="form-label" htmlFor="state">
                    State :
                  </label>
                </div>
                <div className="col-sm-8">
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className="form-control">
                        <option value={""}>Choose...</option>
                        {states.map((state) => (
                          <option key={state._id} value={state._id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                {errors.state && (
                  <span style={{ color: "red" }}>{errors.state.message}</span>
                )}
              </Row>
              <Row className="align-items-center mb-3">
                <div className="col-sm-4">
                  <label htmlFor="name" className="form-label">
                    UTC Offset :
                  </label>{" "}
                </div>
                <div className="col-sm-8">
                  <input
                    {...register("utcOffset", {
                      required: "this is required field",
                    })}
                    type="number"
                    className="form-control"
                  />
                </div>
              </Row>
            </div>
            <div className="col-md-6">
              <Map setPath={setPath} path={path} />
            </div>
            <Row>
              <div className="text-center col-md-3">
                <div className="mb-3 fw-bold">Vehicle Type</div>
              </div>

              <div className="text-center fw-bold col-md-9">Services</div>
            </Row>
            {vehicleTypes.map((vehicleType, i) => (
              <VehicletypeCheckbox
                key={vehicleType._id}
                index={i}
                id={vehicleType._id}
                vehicleType={vehicleType}
                register={register}
                setValue={setValue}
                watch={watch}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger">Cancel</button>
          <button type="submit" className="btn btn-success">
            Add City
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
