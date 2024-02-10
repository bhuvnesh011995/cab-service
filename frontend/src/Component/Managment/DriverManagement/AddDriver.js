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
import {
  emptySelectedDriver,
  getSelectedDriver,
  getSelectedDriverData,
  postDriver,
} from "../../../Redux/features/driverReducer";
import { IMAGE_URL } from "../../../config/config";

export default function AddDriver({ show, setShow, viewModal, id }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const selectedDriver = useSelector(getSelectedDriver);
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);

  useEffect(() => {
    if (id) dispatch(getSelectedDriverData(id));
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (selectedDriver) {
      reset(selectedDriver);
    }
  }, [selectedDriver]);

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
    handleClose();
  }

  function handleClose() {
    dispatch(emptySelectedDriver());
    setShow(false);
  }

  const openFile = (value) => {
    if (watch(value)[0]?.name) {
      const fileUrl = URL.createObjectURL(watch(value)[0]);
      window.open(fileUrl);
    } else {
      window.open(IMAGE_URL + watch(value));
    }
  };

  return (
    <Modal show={show} onHide={() => handleClose()} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>
          {id ? (viewModal ? "View" : "Update") : "Add"} Driver
        </Modal.Title>
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
                  >
                    <option value=''>select</option>
                    {countries.map((country) => (
                      <option
                        value={country._id}
                        selected={
                          watch("address.country") == country._id && country._id
                        }
                      >
                        {country.name}
                      </option>
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
                    disabled={viewModal}
                  >
                    <option value=''>select</option>
                    {states.map((state) => (
                      <option
                        value={state._id}
                        selected={
                          watch("address.state") == state._id && state._id
                        }
                      >
                        {state.name}
                      </option>
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
                    disabled={viewModal}
                  >
                    <option value=''>select</option>
                    {cities.map((city) => (
                      <option
                        value={city._id}
                        selected={watch("address.city") == city._id && city._id}
                      >
                        {city.name}
                      </option>
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
                  />
                </div>
                <div class='m-3'>
                  <input
                    {...register("verified")}
                    class='form-check-input'
                    type='checkbox'
                    disabled={viewModal}
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
                        : `${IMAGE_URL}${watch("driverFile")}`
                      : ""
                  }
                />
                {!viewModal && (
                  <input
                    type='file'
                    className='form-control m-1'
                    {...register("driverFile")}
                    disabled={viewModal}
                  />
                )}
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
                    disabled={viewModal}
                  />
                  {errors?.license?.number && (
                    <span className='text-danger'>
                      {errors?.license?.number.message}
                    </span>
                  )}
                  <div>
                    <div className='d-flex'>
                      <input
                        className=' m-2 form-control'
                        type={
                          watch("license.file") &&
                          watch("license.file")[0]?.name
                            ? "file"
                            : !watch("license.file")?.length
                            ? "file"
                            : "text"
                        }
                        {...register("license.file", {
                          required: "License File Is Required",
                        })}
                        disabled={watch("license.file")?.length || viewModal}
                      />
                      {watch("license.file")?.length ? (
                        <div className='d-flex align-items-center justify-content-center'>
                          <span
                            className='text-primary mx-2 cursor-pointer'
                            style={{ fontSize: "20px" }}
                            onClick={() => openFile("license.file")}
                          >
                            <i className='mdi mdi-eye'></i>
                          </span>
                          {!viewModal && (
                            <span
                              className='text-danger cursor-pointer'
                              style={{ fontSize: "20px" }}
                              onClick={() => setValue("license.file", "")}
                            >
                              <i className='bx bxs-trash' />
                            </span>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {errors?.license?.file && (
                      <span className='text-danger'>
                        {errors?.license?.file.message}
                      </span>
                    )}
                  </div>
                </div>
                <div class='m-3'>
                  <label class='form-label'>Expiry Date</label>
                  <input
                    class=' m-2 form-control'
                    {...register("license.expiryDate", {
                      required: "Please Enter Expiry Date",
                    })}
                    type='date'
                    disabled={viewModal}
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
                    disabled={viewModal}
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
                    disabled={viewModal}
                    placeholder='Enter Aadhar Number'
                  />
                  {errors?.aadhar?.number && (
                    <span className='text-danger'>
                      {errors?.aadhar?.number.message}
                    </span>
                  )}
                  <div>
                    <div className='d-flex'>
                      <input
                        className=' m-2 form-control'
                        type={
                          watch("aadhar.file") && watch("aadhar.file")[0]?.name
                            ? "file"
                            : !watch("aadhar.file")?.length
                            ? "file"
                            : "text"
                        }
                        {...register("aadhar.file", {
                          required: "Aadhar File Is Required",
                        })}
                        disabled={watch("aadhar.file")?.length || viewModal}
                      />
                      {watch("aadhar.file")?.length ? (
                        <div className='d-flex align-items-center justify-content-center'>
                          <span
                            className='text-primary mx-2 cursor-pointer'
                            style={{ fontSize: "20px" }}
                            onClick={() => openFile("aadhar.file")}
                          >
                            <i className='mdi mdi-eye'></i>
                          </span>
                          {!viewModal && (
                            <span
                              className='text-danger cursor-pointer'
                              style={{ fontSize: "20px" }}
                              onClick={() => setValue("aadhar.file", "")}
                            >
                              <i className='bx bxs-trash' />
                            </span>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {errors?.aadhar?.file && (
                      <span className='text-danger'>
                        {errors?.aadhar?.file.message}
                      </span>
                    )}
                  </div>
                </div>
                <div class='m-3'>
                  <input
                    {...register("aadhar.verified")}
                    class='form-check-input'
                    type='checkbox'
                    disabled={viewModal}
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
                    disabled={viewModal}
                    placeholder='Enter Pan Number'
                  />
                  {errors?.pan?.number && (
                    <span className='text-danger'>
                      {errors?.pan?.number.message}
                    </span>
                  )}
                  <div>
                    <div className='d-flex'>
                      <input
                        className=' m-2 form-control'
                        type={
                          watch("pan.file") && watch("pan.file")[0]?.name
                            ? "file"
                            : !watch("pan.file")?.length
                            ? "file"
                            : "text"
                        }
                        {...register("pan.file", {
                          required: "Pan File Is Required",
                        })}
                        disabled={watch("pan.file")?.length || viewModal}
                      />
                      {watch("pan.file")?.length ? (
                        <div className='d-flex align-items-center justify-content-center'>
                          <span
                            className='text-primary mx-2 cursor-pointer'
                            style={{ fontSize: "20px" }}
                            onClick={() => openFile("pan.file")}
                          >
                            <i className='mdi mdi-eye'></i>
                          </span>
                          {!viewModal && (
                            <span
                              className='text-danger cursor-pointer'
                              style={{ fontSize: "20px" }}
                              onClick={() => setValue("pan.file", "")}
                            >
                              <i className='bx bxs-trash' />
                            </span>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {errors?.pan?.file && (
                      <span className='text-danger'>
                        {errors?.pan?.file.message}
                      </span>
                    )}
                  </div>
                </div>
                <div class='m-3'>
                  <input
                    {...register("pan.verified")}
                    class='form-check-input'
                    type='checkbox'
                    disabled={viewModal}
                  />
                  <label class='form-check-label'>Verify</label>
                </div>
              </div>
              <Modal.Footer>
                {!viewModal && (
                  <button
                    type='submit'
                    className='btn m-3 mt-5 btn-outline-primary waves-effect waves-light'
                  >
                    {!id ? "Add" : "Update"} Driver
                  </button>
                )}
                <button
                  type='button'
                  className='btn m-3 mt-5 btn-outline-danger waves-effect waves-light'
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
