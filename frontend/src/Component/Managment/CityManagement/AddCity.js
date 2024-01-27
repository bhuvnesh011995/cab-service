import { useCallback, useEffect, useState } from "react";
import VehicletypeCheckbox from "./VehicleTypeCheckbox";
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
          <button onClick={() => setShow(false)} className="btn btn-danger">
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add City
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
