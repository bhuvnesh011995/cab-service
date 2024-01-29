import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
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
import { addRiderReducer } from "../../../Redux/features/riderReducer";
import BASE_URL, { IMAGE_URL } from "../../../config/config";

export default function AddRider({ viewModal, show, setShow, id }) {
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    dispatch(emptyStates());
    dispatch(emptyCities());
    if (watch("country")) {
      dispatch(fetchStates(watch("country")));
    }
  }, [watch("country")]);

  useEffect(() => {
    dispatch(emptyCities());
    if (watch("state")) dispatch(fetchCities(watch("state")));
  }, [watch("state")]);

  const handleCancel = () => {
    setShow(false);
  };

  const addNewRider = (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", data.userImage[0]);
    dispatch(addRiderReducer(formData));
  };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      size='xl
    '
    >
      <Modal.Header closeButton>
        <Modal.Title>Rider Det</Modal.Title>
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
          <div class='card'>
            <div class='card-body'>
              <form
                className='d-flex justify-content-space-around flex-wrap'
                onSubmit={handleSubmit(addNewRider)}
              >
                <div className='col' style={{ width: "100px" }}>
                  <img
                    className='row'
                    style={{ height: "100px", width: "100px" }}
                    src={
                      watch("userImage")?.length &&
                      URL.createObjectURL(watch("userImage")[0])
                      // : process.env.GET_IMAGE_URL +
                      //   "dixxi1707096954835tongaG.png"
                    }
                  />
                  <input
                    type='file'
                    {...register("userImage", {
                      required: "Please Select Your Image",
                    })}
                  />
                  {errors?.userImage && (
                    <span className='text-danger'>
                      {errors.userImage.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>First Name :</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("firstName", {
                      required: "Please Enter First Name",
                    })}
                    placeholder={"First Name"}
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
                    disabled={viewModal}
                    className='form-control'
                    {...register("lastName", {
                      required: "Please Enter Last Name",
                    })}
                    placeholder={"Last Name"}
                  />
                  {errors?.lastName && (
                    <span className='text-danger'>
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div class='m-3'>
                  <label class='form-label'>ID :</label>
                  <input
                    class='form-control'
                    disabled='true'
                    type={"text"}
                    placeholder={"id"}
                    {...register("userId")}
                  />
                </div>

                <div className='m-3'>
                  <label className='form-label'>Email :</label>
                  <input
                    type='email'
                    disabled={viewModal}
                    className='form-control'
                    {...register("email", {
                      required: "Please Enter Email",
                    })}
                    placeholder={"email"}
                  />
                  {errors?.email && (
                    <span className='text-danger'>{errors.email.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Mobile No. :</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("mobile", {
                      required: "Please Enter Mobile No.",
                    })}
                    placeholder={"enter mobile no."}
                  />
                  {errors?.mobile && (
                    <span className='text-danger'>{errors.mobile.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Password :</label>
                  <input
                    type='password'
                    disabled={viewModal}
                    className='form-control'
                    {...register("password", {
                      required: "Please Enter Password",
                    })}
                    placeholder={"password"}
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
                    disabled={viewModal}
                    className='form-control'
                    {...register("DOB", {
                      required: "Please Enter Date Of Birth",
                    })}
                    type='date'
                  />
                  {errors?.DOB && (
                    <span className='text-danger'>{errors.DOB.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Country : </label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("country", {
                      required: "Please Select Country",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    {countries.map((country) => (
                      <option value={country._id}>{country.name}</option>
                    ))}
                  </select>
                  {errors?.country && (
                    <span className='text-danger'>
                      {errors.country.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>State : </label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("state", {
                      required: "Please Select State",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    {states.map((state) => (
                      <option value={state._id}>{state.name}</option>
                    ))}
                  </select>
                  {errors?.state && (
                    <span className='text-danger'>{errors.state.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>City : </label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("city", {
                      required: "Please Select City",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    {cities.map((city) => (
                      <option value={city._id}>{city.name}</option>
                    ))}
                  </select>
                  {errors?.city && (
                    <span className='text-danger'>{errors.city.message}</span>
                  )}
                </div>

                <div className='m-3'>
                  <label className='form-label'>Address :</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("place", {
                      required: "Please Enter Address",
                    })}
                    placeholder={"address"}
                  />
                  {errors?.place && (
                    <span className='text-danger'>{errors.place.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Pincode :</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("pincode", {
                      required: "Please Enter Pincode",
                    })}
                    placeholder={"pincode"}
                  />
                  {errors?.pincode && (
                    <span className='text-danger'>
                      {errors.pincode.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Gender : </label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("gender", {
                      required: "Please Select Gender",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                  </select>
                  {errors?.gender && (
                    <span className='text-danger'>{errors.gender.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Status : </label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("status", {
                      required: "Please Select Status",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    <option value='ACTIVE'>Active</option>
                    <option value='INACTIVE'>InActive</option>
                  </select>
                  {errors?.status && (
                    <span className='text-danger'>{errors.status.message}</span>
                  )}
                </div>
                <div class='m-3'>
                  <input
                    {...register("verified")}
                    class='form-check-input'
                    type='checkbox'
                  />
                  <label class='form-check-label'>Verify</label>
                </div>
                <div class='m-3'>
                  <label class='form-label'>Login Device</label>
                  <input class='form-control' disabled='true' type={"text"} />
                </div>
                <div class='m-3'>
                  <label class='form-label'>Last Login Activity</label>
                  <input class='form-control' disabled='true' type={"text"} />
                </div>
                <div class='m-3'>
                  <label class='form-label'>Last Password Change Date</label>
                  <input class='form-control' disabled='true' type={"text"} />
                </div>
                <div class='m-3'>
                  <label class='form-label'>Remark</label>
                  <input class='form-control' disabled='true' type={"text"} />
                </div>
                <div style={{ width: "90%" }} class='m-3'>
                  <label class='form-label'>Details</label>
                  <input class='form-control' disabled='true' type={"text"} />
                </div>
                <Modal.Footer>
                  <div
                    className='mb-3'
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type='submit'
                      className='btn me-3 btn-outline-primary waves-effect waves-light'
                      disabled={viewModal}
                    >
                      Add Rider
                    </button>
                    <button
                      onClick={handleCancel}
                      type='button'
                      className='btn me-3 btn-outline-danger waves-effect waves-light'
                    >
                      Cancel
                    </button>
                  </div>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
