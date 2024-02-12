import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  emailPattern,
  mustBeNumbers,
  namePattern,
  passwordPattern,
  phonePattern,
} from "../../../Common/validations";
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
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import { Modal } from "react-bootstrap";
import { postDriver } from "../../../Redux/features/driverReducer";

export default function AddDriver({ show, setShow, viewModal, id }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (watch("address.country")) {
      dispatch(fetchStates(watch("address.country")));
      dispatch(emptyCities());
    } else dispatch(emptyStates());
  }, [watch("address.country")]);

  useEffect(() => {
    if (watch("address.state")) dispatch(fetchCities(watch("address.state")));
    else dispatch(emptyCities());
  }, [watch("address.state")]);

  async function addNewDriver(data) {
    const formData = new FormData();
    for (let file of data.pan.file) formData.append("panFile", file);
    for (let file of data.aadhar.file) formData.append("aadharFile", file);
    for (let file of data.license.file) formData.append("licenseFile", file);
    for (let file of data.driverFile) formData.append("driverFile", file);
    formData.append("data", JSON.stringify(data));
    dispatch(postDriver(formData));
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={() => handleClose()} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Add Driver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          class='row'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class='col-lg-10'>
            {/* <div class='card'>
              <div class='card-body'> */}
            <form onSubmit={handleSubmit(addNewDriver)}>
              <div className='d-flex justify-content-space-around flex-wrap'>
                <div className='m-3'>
                  <label className='form-label'>First Name :</label>
                  <input
                    className='form-control'
                    {...register("firstName", {
                      required: "Please Enter Your First Name",
                      pattern: namePattern,
                    })}
                    type={"text"}
                    placeholder='First Name'
                  />
                  {errors?.firstName && (
                    <span className='text-danger'>
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Last Name :</label>
                  <input
                    className='form-control'
                    {...register("lastName", { pattern: namePattern })}
                    type={"text"}
                    placeholder='Last Name'
                  />
                  {errors?.lastName && (
                    <span className='text-danger'>
                      {errors?.lastName.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Email :</label>
                  <input
                    className='form-control'
                    {...register("email", {
                      required: "Please Enter Your Email",
                      pattern: emailPattern,
                    })}
                    type={"email"}
                    placeholder='Email'
                  />
                  {errors?.email && (
                    <span className='text-danger'>{errors.email.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Contact No :</label>
                  <input
                    className='form-control'
                    {...register("mobile", {
                      required: "Please Enter Your Contact No.",
                      pattern: phonePattern,
                    })}
                    type={"text"}
                    placeholder='Contact Number'
                  />
                  {errors?.mobile && (
                    <span className='text-danger'>{errors.mobile.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Password :</label>
                  <input
                    className='form-control'
                    {...register("password", {
                      required: "Please Enter Password",
                      pattern: passwordPattern,
                    })}
                    type={"password"}
                  />
                  {errors?.password && (
                    <span className='text-danger'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Date Of Birth :</label>
                  <input
                    className='form-control'
                    {...register("DOB", {
                      required: "Please Enter Date Of Birth",
                    })}
                    type={"date"}
                  />
                  {errors?.DOB && (
                    <span className='text-danger'>{errors.DOB.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Country : </label>
                  <select
                    style={{ width: "200px" }}
                    className='form-select'
                    {...register("address.country", {
                      required: "Please Select Country",
                    })}
                  >
                    <option value=''>select</option>
                    {countries.map((country) => (
                      <option value={country._id}>{country.name}</option>
                    ))}
                  </select>
                  {errors?.address?.country && (
                    <span className='text-danger'>
                      {errors.address.country.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>State : </label>
                  <select
                    style={{ width: "200px" }}
                    className='form-select'
                    {...register("address.state", {
                      required: "Please Select State",
                    })}
                  >
                    <option value=''>select</option>
                    {states.map((state) => (
                      <option value={state._id}>{state.name}</option>
                    ))}
                  </select>
                  {errors?.address?.state && (
                    <span className='text-danger'>
                      {errors.address.state.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>City : </label>
                  <select
                    style={{ width: "200px" }}
                    className='form-select'
                    {...register("address.city", {
                      required: "Please Select City",
                    })}
                  >
                    <option value=''>select</option>
                    {cities.map((city) => (
                      <option value={city._id}>{city.name}</option>
                    ))}
                  </select>
                  {errors?.address?.city && (
                    <span className='text-danger'>
                      {errors.address.city.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Address :</label>
                  <input
                    className='form-control'
                    {...register("address.place", {
                      required: "Please Enter Address",
                    })}
                    type={"text"}
                  />
                  {errors?.address?.place && (
                    <span className='text-danger'>
                      {errors.address.place.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Pincode :</label>
                  <input
                    className='form-control'
                    {...register("address.pincode", {
                      required: "Please Enter Your Pincode",
                      pattern: mustBeNumbers,
                    })}
                    type={"text"}
                  />
                  {errors?.address?.pincode && (
                    <span className='text-danger'>
                      {errors.address.pincode.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Status : </label>
                  <select
                    style={{ width: "200px" }}
                    className='form-select'
                    {...register("status")}
                  >
                    <option value=''>select</option>
                    <option value={"ACTIVE"}>Active</option>
                    <option value={"INACTIVE"}>InActive</option>
                  </select>
                </div>

                <div className='m-3'>
                  <label className='form-label'>Used Referral :</label>
                  <input
                    className='form-control'
                    {...register("referralCode")}
                    type={"text"}
                  />
                </div>
                <div class='m-3'>
                  <input
                    {...register("verified")}
                    class='form-check-input'
                    type='checkbox'
                  />
                  <label class='form-check-label'>Verify</label>
                </div>
              </div>
              <div className='col m-3' style={{ width: "100px" }}>
                <img
                  className='row'
                  style={{ height: "100px", width: "100px" }}
                  src={
                    watch("driverFile")
                      ? watch("driverFile")[0]?.name
                        ? URL.createObjectURL(watch("driverFile")[0])
                        : ""
                      : ""
                  }
                />
                <input
                  type='file'
                  className='form-control m-1'
                  {...register("driverFile")}
                />
              </div>
              <div className='d-flex justify-content-space-around flex-wrap'>
                <div class='m-3'>
                  <label class='form-label'>License</label>
                  <input
                    class=' m-2 form-control'
                    {...register("license.number", {
                      required: "Please Enter License Number",
                    })}
                    type='text'
                    placeholder='Enter License Number'
                  />
                  {errors?.license?.number && (
                    <span className='text-danger'>
                      {errors?.license?.number.message}
                    </span>
                  )}
                  <input
                    className=' m-2 form-control'
                    type='file'
                    {...register("license.file", {
                      required: "License File Is Required",
                    })}
                  />
                  {errors?.license?.file && (
                    <span className='text-danger'>
                      {errors?.license?.file.message}
                    </span>
                  )}
                </div>
                <div class='m-3'>
                  <label class='form-label'>Expiry Date</label>
                  <input
                    class=' m-2 form-control'
                    {...register("license.expiryDate", {
                      required: "Please Enter Expiry Date",
                    })}
                    type='date'
                  />
                  {errors?.license?.expiryDate && (
                    <span className='text-danger'>
                      {errors.license.expiryDate.message}
                    </span>
                  )}
                </div>
                <div class='m-3'>
                  <input
                    {...register("license.verified")}
                    class='form-check-input'
                    type='checkbox'
                  />
                  <label class='form-check-label'>Verify Aadhar</label>
                </div>
              </div>

              <div className='d-flex justify-content-space-around flex-wrap'>
                <div class='m-3'>
                  <label class='form-label'>Aadhar</label>
                  <input
                    class=' m-2 form-control'
                    {...register("aadhar.number", {
                      required: "Please Enter Aadhar Number",
                    })}
                    type='number'
                    placeholder='Enter Aadhar Number'
                  />
                  {errors?.aadhar?.number && (
                    <span className='text-danger'>
                      {errors?.aadhar?.number.message}
                    </span>
                  )}
                  <input
                    className=' m-2 form-control'
                    type='file'
                    {...register("aadhar.file", {
                      required: "Aadhar File Is Required",
                    })}
                  />
                  {errors?.aadhar?.file && (
                    <span className='text-danger'>
                      {errors?.aadhar?.file.message}
                    </span>
                  )}
                </div>
                <div class='m-3'>
                  <input
                    {...register("aadhar.verified")}
                    class='form-check-input'
                    type='checkbox'
                  />
                  <label class='form-check-label'>Verify Pan</label>
                </div>
              </div>

              <div className='d-flex justify-content-space-around flex-wrap'>
                <div class='m-3'>
                  <label class='form-label'>Pan</label>
                  <input
                    class=' m-2 form-control'
                    {...register("pan.number", {
                      required: "Please Enter Pan Number",
                    })}
                    type='text'
                    placeholder='Enter Pan Number'
                  />
                  {errors?.pan?.number && (
                    <span className='text-danger'>
                      {errors?.pan?.number.message}
                    </span>
                  )}
                  <input
                    className=' m-2 form-control'
                    type='file'
                    {...register("pan.file", {
                      required: "Pan File Is Required",
                    })}
                  />
                  {errors?.pan?.file && (
                    <span className='text-danger'>
                      {errors?.pan?.file.message}
                    </span>
                  )}
                </div>
                <div class='m-3'>
                  <input
                    {...register("pan.verified")}
                    class='form-check-input'
                    type='checkbox'
                  />
                  <label class='form-check-label'>Verify</label>
                </div>
              </div>
              <Modal.Footer>
                <button
                  type='submit'
                  className='btn m-3 mt-5 btn-outline-primary waves-effect waves-light'
                >
                  Add Driver
                </button>
                <button
                  type='button'
                  className='btn m-3 mt-5 btn-outline-primary waves-effect waves-light'
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Modal.Footer>
            </form>
          </div>
        </div>
        {/* </div>
          </div> */}
      </Modal.Body>
    </Modal>
  );
}
