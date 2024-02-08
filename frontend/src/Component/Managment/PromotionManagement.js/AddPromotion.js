import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
  addPromotion,
  cleanPromotion,
  getPromotion,
  status,
  updatePromotion,
} from "../../../Redux/features/promotionReducer";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
const forUsersOption = [
  { value: "ADMIN", label: "ADMIN" },
  { value: "DRIVER", label: "DRIVER" },
  { value: "RIDER", label: "RIDER" },
];

export default function AddPromotion({ setShow, show }) {
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (ready) {
      dispatch(fetchCountries());
    } else setReady(true);
  }, [ready]);

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

  const onSubmit = useCallback(
    async (data) => {
      let forUsers = data.forUsers?.map((option) => option.value);
      let formData = {
        ...data,
        forUsers,
      };
      if (!promotion) {
        dispatch(addPromotion(formData));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = formData[field]));
          dispatch(updatePromotion({ id: promotion._id, newData: obj }));
        }
      }
    },
    [isDirty, dirtyFields]
  );

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {" "}
          {promotion ? "Update Promotion" : " Add New Promotion"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: "this is Required field" })}
                  className="form-control"
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
          </div>
          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                type={"text"}
                placeholder={"Promotion description ...."}
                {...register("description", {
                  required: "this is Required field",
                })}
              />
              {errors.status && (
                <span style={{ color: "red" }}>{errors.status.message}</span>
              )}
            </div>{" "}
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
