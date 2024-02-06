import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
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
import {
  fetchVehicleType,
  getAllVehicleType,
} from "../../../Redux/features/vehicleTypeReducer";
import {
  addPromotion,
  cleanPromotion,
  getPromotion,
  status,
  updatePromotion,
} from "../../../Redux/features/promotionReducer";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import {
  getAllAdmins,
  fetchAdmins,
} from "../../../Redux/features/adminReducer";
import { getAllRiders, getRiders } from "../../../Redux/features/riderReducer";
import { addPromoCode } from "../../../Redux/features/promoCodeReducer";
const initialState = {
  name: "",
  email: "",
  mobile: "",
  status: "",
};
export default function AddPromoCode({ setShow, show }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState(false);
  const countries = useSelector(getCountries);
  const states = useSelector(getStates);
  const cities = useSelector(getCities);
  const promotionStatus = useSelector(status);
  const vehicleTypes = useSelector(getAllVehicleType);
  const [filter, setFilter] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (ready) {
      dispatch(fetchCountries());
      dispatch(fetchVehicleType());
      dispatch(fetchAdmins());
    } else setReady(true);
  }, [ready]);
  useEffect(() => {
    dispatch(getAllRiders(filter));
  }, [filter]);

  const admin = useSelector(getAllAdmins) || [];
  const riders = useSelector(getRiders) || [];

  const adminOptions = admin.map((adminUser) => ({
    value: adminUser._id,
    label: adminUser.name,
  }));
  const riderOptions = riders.map((riderUser) => ({
    value: riderUser._id,
    label: riderUser.firstName,
  }));

  const selectUserValue = watch("forUser");
  let dynamicOptions = [];
  if (selectUserValue === "ADMIN") {
    dynamicOptions = [...adminOptions];
  } else if (selectUserValue === "RIDER") {
    dynamicOptions = [...riderOptions];
  }

  const forUsersOption = [{ value: "", label: "Choose..." }, ...dynamicOptions];

  // ... ( code)

  console.log("rider", riders);
  const promotion = useSelector(getPromotion);
  useEffect(() => {
    if (promotion) {
      reset(promotion);
      setValue("country", promotion.country);
      setValue("state", promotion.state);
      setValue("city", promotion.city);
    }
  }, [promotion]);

  useEffect(() => {
    if (ready) {
      if (watch("state")) {
        dispatch(fetchCities(watch("state")));
      } else {
        dispatch(emptyCities());
      }
    }
  }, [watch("state"), ready, promotion]);
  useEffect(() => {
    if (ready) {
      if (watch("country")) {
        dispatch(fetchStates(watch("country")));
      } else {
        dispatch(emptyStates());
      }
    }
  }, [watch("country"), ready, promotion]);
  useEffect(() => {
    return () => {
      if (promotionStatus === "fetched") dispatch(cleanPromotion());
    };
  }, [promotionStatus]);

  const onSubmit = useCallback(async (data) => {
    const userIds = data.selectUser.map((user) => user.value);
    const newData = { ...data, selectUser: userIds };
    dispatch(addPromoCode(newData));
  }, []);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Promocode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
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
                <label>vehicleType</label>
                <select
                  name="vehicleType"
                  {...register("vehicleType", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                >
                  <option>Choose</option>
                  {vehicleTypes.map((vehicleType) => (
                    <option value={vehicleType._id}>{vehicleType.name}</option>
                  ))}
                </select>

                {errors.vehicleType && (
                  <span style={{ color: "red" }}>
                    {errors.vehicleType.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label" htmlFor="forUser">
                  forUser :
                </label>
                <Controller
                  name="forUser"
                  control={control}
                  {...register("forUser", {
                    required: "this is Required field",
                  })}
                  render={({ field }) => (
                    <select {...field} className="form-control">
                      <option value={""}>Choose...</option>
                      <option value={"ADMIN"}>ADMIN</option>
                      <option value={"DRIVER"}>DRIVER</option>
                      <option value={"RIDER"}>RIDER</option>
                    </select>
                  )}
                />
                {errors.forUser && (
                  <span style={{ color: "red" }}>{errors.forUser.message}</span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label>Select Users</label>
                <Controller
                  name="selectUser"
                  control={control}
                  rules={{
                    required: "This is a required field",
                    validate: (value) => value.length > 0,
                  }}
                  render={({ field }) => (
                    <ReactSelect isMulti {...field} options={forUsersOption} />
                  )}
                />

                {errors.selectUser && (
                  <span style={{ color: "red" }}>
                    {errors.selectUser.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Valid From</label>
                <input
                  type="date"
                  name="validFrom"
                  {...register("validFrom", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                />
                {errors.validFrom && (
                  <span style={{ color: "red" }}>
                    {errors.validFrom.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Valid To</label>
                <input
                  type="date"
                  name="validFrom"
                  {...register("validTo", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                />
                {errors.validTo && (
                  <span style={{ color: "red" }}>{errors.validTo.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Promo Code</label>
                <input
                  type="Number"
                  name="promoCode"
                  {...register("promoCode", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                />
                {errors.promoCode && (
                  <span style={{ color: "red" }}>
                    {errors.promoCode.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Discount Type</label>
                <select
                  name="discountType"
                  {...register("discountType", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                >
                  <option>Choose</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Discount">Discount</option>
                </select>

                {errors.discountType && (
                  <span style={{ color: "red" }}>
                    {errors.discountType.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Discount Value</label>
                <input
                  type="Number"
                  name="discountValue"
                  {...register("discountValue", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                />
                {errors.discountValue && (
                  <span style={{ color: "red" }}>
                    {errors.discountValue.message}
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
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="multipleUserCheckbox"
                  {...register("multipleUser", {
                    required: "This is a required field",
                  })}
                />
                <label
                  className="form-check-label"
                  htmlFor="multipleUserCheckbox"
                >
                  Multiple User
                </label>
              </div>
              {errors.multipleUser && (
                <span style={{ color: "red" }}>
                  {errors.multipleUser.message}
                </span>
              )}
            </div>
          </div>

          <button type="submit" class="btn btn-success">
            {" "}
            submit{" "}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
