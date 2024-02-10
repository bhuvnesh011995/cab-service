import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import { useCallback, useEffect, useState } from "react";
import {
  emptyStates,
  fetchStates,
  getStates,
} from "../../../Redux/features/stateReducer";
import {
  emptyCities,
  fetchCities,
  getCities,
} from "../../../Redux/features/cityReducer";
import ReactSelect from "react-select";
import {
  addReferral,
  getReferral,
  updateReferral,
} from "../../../Redux/features/referralReducer";
import { toast } from "react-toastify";

export default function AddReferral({ show, setShow }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const forUsersOption = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "DRIVER", label: "DRIVER" },
    { value: "RIDER", label: "RIDER" },
  ];
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const countries = useSelector(getCountries);
  const states = useSelector(getStates);
  const cities = useSelector(getCities);

  const referral = useSelector(getReferral);
  useEffect(() => {
    if (referral) {
      reset(referral);
      setValue("country", referral.country);
      setValue("state", referral.state);
      setValue("city", referral.city);
    }
  }, [referral]);

  useEffect(() => {
    if (ready) {
      dispatch(fetchCountries());
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (ready) {
      if (watch("country")) {
        dispatch(fetchStates(watch("country")));
      } else {
        dispatch(emptyStates());
      }
    }
  }, [watch("country")]);

  useEffect(() => {
    if (ready) {
      if (watch("state")) {
        dispatch(fetchCities(watch("state")));
      } else {
        dispatch(emptyCities());
      }
    }
  }, [watch("state"), ready]);

  const onSubmit = useCallback(
    async (data) => {
      let forUsers = data.forUsers?.map((option) => option.value);
      let formData = {
        ...data,
        forUsers,
      };
      if (!referral) {
        dispatch(addReferral(formData));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = formData[field]));
          dispatch(updateReferral({ id: referral._id, newData: obj }));
        }
      }
    },
    [isDirty, dirtyFields]
  );

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Referral</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  {...register("name", { required: "this is Required field" })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label" htmlFor="country">
                  Country :
                </label>
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
                {errors.country && (
                  <span style={{ color: "red" }}>{errors.country.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label" htmlFor="state">
                  State :
                </label>
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
                {errors.state && (
                  <span style={{ color: "red" }}>{errors.state.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label" htmlFor="city">
                  City :
                </label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "this is required field" }}
                  render={({ field }) => (
                    <select {...field} className="form-control">
                      <option value={""}>Choose...</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.city && (
                  <span style={{ color: "red" }}>{errors.city.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>For Users</label>
                <Controller
                  name="forUsers"
                  control={control}
                  defaultValue={forUsersOption ? [] : undefined}
                  rules={{
                    required: "this is required field",
                    validate: (value) => value.length > 0,
                  }}
                  render={({ field }) => (
                    <ReactSelect options={forUsersOption} isMulti {...field} />
                  )}
                />
                {errors.forUsers && (
                  <span style={{ color: "red" }}>
                    {errors.forUsers.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Status</label>
                <select
                  name="status"
                  {...register("status", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                >
                  <option>Choose</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>

                {errors.status && (
                  <span style={{ color: "red" }}>{errors.status.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <h4> For Referrer</h4>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="freeRideToReferrer"
                    {...register("freeRideToReferrer", {
                      required: "this is Required field",
                    })}
                  />
                  <label className="form-check-label" htmlFor="freeRide">
                    Free Ride
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Max Free Ride</label>
                <input
                  type="number"
                  name="maxFreeRideToReferrer"
                  className="form-control"
                  {...register("maxFreeRideToReferrer", {
                    required: "this is Required field",
                  })}
                />
                {errors.maxFreeRideToReferrer && (
                  <span style={{ color: "red" }}>
                    {errors.maxFreeRideToReferrer.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Amount</label>
                <input
                  type="number"
                  name="amountToReferrer"
                  className="form-control"
                  {...register("amountToReferrer", {
                    required: "this is Required field",
                  })}
                />
                {errors.amountToReferrer && (
                  <span style={{ color: "red" }}>
                    {errors.amountToReferrer.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Max Amount</label>
                <input
                  type="number"
                  name="maxAmountToReferrer"
                  className="form-control"
                  {...register("maxAmountToReferrer", {
                    required: "this is Required field",
                  })}
                />
                {errors.maxAmountToReferrer && (
                  <span style={{ color: "red" }}>
                    {errors.maxAmountToReferrer.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <h4>For Applier </h4>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="freeRideToApplier"
                    {...register("freeRideToApplier", {
                      required: "this is Required field",
                    })}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="freeRideToApplier"
                  >
                    Free Ride
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-1">
                <label>Amount</label>
                <input
                  type="number"
                  name="amountToApplier"
                  className="form-control"
                  {...register("amountToApplier", {
                    required: "this is Required field",
                  })}
                />
                {errors.amountToApplier && (
                  <span style={{ color: "red" }}>
                    {errors.amountToApplier.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShow(false)}
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Referral
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
