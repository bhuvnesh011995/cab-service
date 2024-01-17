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
  addAdmin,
  clearAdmin,
  getAdmin,
  status,
  updateAdmin,
} from "../../../Redux/features/adminReducer";
import { toast } from "react-toastify";

export default function AddNew({ show, setShow }) {
  const [ready, setReady] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const onSubmit = useCallback(
    async (data) => {
      if (!admin) {
        dispatch(addAdmin(data));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = data[field]));

          dispatch(updateAdmin({ id: admin._id, data: obj }));
        }
      }
    },
    [isDirty, dirtyFields],
  );

  const countries = useSelector(getCountries);
  const states = useSelector(getStates);
  const cities = useSelector(getCities);
  const dispatch = useDispatch();
  const adminStatus = useSelector(status);
  useEffect(() => {
    if (ready) {
      dispatch(fetchCountries());
    } else setReady(true);

    return () => {
      if (adminStatus === "fetched") dispatch(clearAdmin());
    };
  }, [ready, adminStatus]);
  const admin = useSelector(getAdmin);
  useEffect(() => {
    if (admin && ready) {
      reset(admin);
      setValue("country", admin.country);
      setValue("state", admin.state);
      setValue("city", admin.city);
    }
  }, [admin]);

  useEffect(() => {
    if (ready) {
      if (watch("state")) {
        dispatch(fetchCities(watch("state")));
      } else {
        dispatch(emptyCities());
      }
    }
  }, [watch("state"), ready, admin]);
  useEffect(() => {
    if (ready) {
      if (watch("country")) {
        dispatch(fetchStates(watch("country")));
      } else {
        dispatch(emptyStates());
      }
    }
  }, [watch("country"), ready, admin]);
  return (
    <>
      <Modal size='md' show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='name'>
                    Name :
                  </label>

                  <input
                    {...register("name", {
                      required: "this is required field",
                    })}
                    type='text'
                    className='form-control'
                    placeholder='Enter Name'
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='username'>
                    Username :
                  </label>

                  <input
                    {...register("username", {
                      required: "this is required field",
                    })}
                    type='text'
                    className='form-control'
                    placeholder='Enter Username'
                  />
                  {errors.username && (
                    <span style={{ color: "red" }}>
                      {errors.username.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='username'>
                    Email :
                  </label>

                  <input
                    {...register("email", {
                      required: "this is required field",
                    })}
                    type='text'
                    className='form-control'
                    placeholder='Enter Email'
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='country'>
                    Country :
                  </label>
                  <Controller
                    name='country'
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className='form-control'>
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
                    <span style={{ color: "red" }}>
                      {errors.country.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='state'>
                    State :
                  </label>
                  <Controller
                    name='state'
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className='form-control'>
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
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='city'>
                    City :
                  </label>
                  <Controller
                    name='city'
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className='form-control'>
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
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='password'>
                    Password :
                  </label>

                  <input
                    {...register("password", {
                      required: "this is required field",
                    })}
                    type='password'
                    className='form-control'
                    placeholder='Enter Username'
                  />
                  {errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='password'>
                    Status :
                  </label>

                  <select
                    {...register("status", {
                      required: "this is required field",
                    })}
                    className='form-control'
                  >
                    <option value={""}>Choose...</option>
                    <option value={"ACTIVE"}>Active</option>
                    <option value={"INACTIVE"}>Inactive</option>
                  </select>
                  {errors.status && (
                    <span style={{ color: "red" }}>
                      {errors.status.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='text-right'>
              <button type='submit' className='btn btn-success'>
                Add
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
