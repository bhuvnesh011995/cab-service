import { useEffect, useState } from "react";
import "./AddIndividualFare.css";
import BtnDark from "../../Common/Buttons/BtnDark";
import { IconContext } from "react-icons";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCities,
  fetchCities,
  getCities,
} from "../../../Redux/features/cityReducer";
import {
  emptyStates,
  fetchStates,
  getStates,
} from "../../../Redux/features/stateReducer";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import {
  emptySelectedFare,
  getSelectedFareData,
  postFare,
  selectedFare,
} from "../../../Redux/features/individualFareReducer";
import {
  fetchVehicleType,
  getAllVehicleType,
} from "../../../Redux/features/vehicleTypeReducer";

const initialState = [{ minKM: null, maxKM: null, fare: null }];

export default function AddIndividualFare({
  fareId,
  setShow,
  show,
  viewModal,
}) {
  const {
    register,
    watch,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);
  const vehicleTypes = useSelector(getAllVehicleType);
  const selectedFareData = useSelector(selectedFare);
  const [perKMCharge, setPerKMCharge] = useState(initialState);
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    if (selectedFareData) reset(selectedFareData);
    else {
      setPerKMCharge([...initialState]);
      reset({});
    }
    if (selectedFareData?.perKmChargeData) {
      setPerKMCharge([...selectedFareData.perKmChargeData]);
    }
  }, [selectedFareData]);

  useEffect(() => {
    if (fareId) {
      dispatch(getSelectedFareData(fareId));
    }
    dispatch(fetchCountries());
    dispatch(fetchVehicleType());
  }, []);

  useEffect(() => {
    if (watch("country")) {
      dispatch(fetchStates(watch("country")));
      dispatch(emptyCities());
    } else dispatch(emptyStates());
  }, [watch("country")]);

  useEffect(() => {
    if (watch("state")) dispatch(fetchCities(watch("state")));
    else dispatch(emptyCities());
  }, [watch("state")]);

  function handleClick(e) {
    e.preventDefault();
    // const addAnotherFare = perKMCharge.map(
    //   (perKM) =>
    //     !!perKM.fare?.length && !!perKM.maxKM?.length && !!perKM.minKM?.length,
    // );
    // if (addAnotherFare.includes(false)) {
    //   return;
    // }
    setPerKMCharge([...perKMCharge, ...initialState]);
  }

  const addNewFare = async (data) => {
    dispatch(postFare(data));
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    dispatch(emptySelectedFare());
  };

  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>
          {viewModal ? "View" : fareId ? "Update" : "Add New"} Individual Fare
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class='card'>
          <div class='card-body'>
            <form onSubmit={handleSubmit(addNewFare)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div className='m-3'>
                  <label className='form-label'>Country</label>
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
                      <option
                        value={country._id}
                        selected={
                          country._id == watch("country") && watch("country")
                        }
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors?.country && (
                    <span className='text-danger'>
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <div className='m-3'>
                  <label className='form-label'>State</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("state", { required: "Please Select State" })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    {states.map((state) => (
                      <option
                        value={state._id}
                        selected={state._id == watch("state") && watch("state")}
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors?.state && (
                    <span className='text-danger'>{errors.state.message}</span>
                  )}
                </div>

                <div className='m-3'>
                  <label className='form-label'>City</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("city", { required: "Please Select City" })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    {cities.map((city) => (
                      <option
                        value={city._id}
                        selected={city._id == watch("city") && watch("city")}
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors?.city && (
                    <span className='text-danger'>{errors.city.message}</span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Vehicle Type</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    name='selectedStatus'
                    className='form-select'
                    {...register("vehicleType", {
                      required: "Please Select vehicleType",
                    })}
                  >
                    <option value=''>select</option>
                    {vehicleTypes.map((vehicleType) => (
                      <option value={vehicleType._id}>
                        {vehicleType.name}
                      </option>
                    ))}
                  </select>
                  {errors?.vehicleType && (
                    <span className='text-danger'>
                      {errors.vehicleType.message}
                    </span>
                  )}
                </div>

                <div className='m-3'>
                  <label className='form-label'>Base Fare : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("baseFare", {
                      required: "Please Enter Base Fare",
                    })}
                    type={"number"}
                    placeholder={"base Fare"}
                  />
                  {errors?.baseFare && (
                    <span className='text-danger'>
                      {errors.baseFare.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Min Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("minCharge", {
                      required: "Please Enter Min Charge",
                    })}
                    type={"number"}
                    placeholder={"Min Charge"}
                  />
                  {errors?.minCharge && (
                    <span className='text-danger'>
                      {errors.minCharge.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Per Min Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("perMinCharge", {
                      required: "Please Enter Per Min Charge",
                    })}
                    type={"number"}
                    placeholder={"Per Min Charge"}
                  />
                  {errors?.perMinCharge && (
                    <span className='text-danger'>
                      {errors.perMinCharge.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Cancel Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("cancelCharge", {
                      required: "Please Enter Cancel Charge",
                    })}
                    type={"number"}
                    placeholder={"Cancel Charge"}
                  />
                  {errors?.cancelCharge && (
                    <span className='text-danger'>
                      {errors.cancelCharge.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Booking Fee : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("bookingFee", {
                      required: "Please Enter Booking Fee",
                    })}
                    type={"number"}
                    placeholder={"Booking Fee"}
                  />
                  {errors?.bookingFee && (
                    <span className='text-danger'>
                      {errors.bookingFee.message}
                    </span>
                  )}
                </div>

                <div className='m-3'>
                  <label className='form-label'>Admin Commission Type</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("adminCommissionType", {
                      required: "Please Select Admin Commission Type",
                    })}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    <option value='FIX'>Fix</option>
                    <option value='PERCENTAGE'>Percentage</option>
                  </select>
                  {errors?.adminCommissionType && (
                    <span className='text-danger'>
                      {errors.adminCommissionType.message}
                    </span>
                  )}
                </div>
                <div className='m-3'>
                  <label className='form-label'>Admin Commission : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("adminCommission", {
                      required: "Please Enter Admin Commission",
                    })}
                    type={"number"}
                    placeholder={"Admin Commission"}
                  />
                  {errors?.adminCommission && (
                    <span className='text-danger'>
                      {errors.adminCommission.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <div className='d-flex align-items-center justify-content-center'>
                  {!viewModal && (
                    <BtnDark
                      title={"Add More"}
                      handleClick={handleClick}
                      isDisabled={viewModal}
                    />
                  )}
                </div>
                <div className='d-flex flex-column'>
                  <span className='d-flex align-items-center justify-content-center h4'>
                    Extra Per KM Charge
                  </span>
                  <div>
                    {perKMCharge?.map((ele, i) => (
                      <div className='d-flex flex-row m-2'>
                        <IconContext.Provider value={"#fff"}>
                          <input
                            type='number'
                            placeholder='min KM'
                            disabled={viewModal}
                            className='form-control mx-2'
                            {...register(`perKmChargeData[${i}].minKM`, {
                              onChange: ({ target }) => {
                                setPerKMCharge([...watch("perKmChargeData")]);
                              },
                            })}
                          />

                          <input
                            type='number'
                            placeholder='max KM'
                            disabled={viewModal}
                            className='form-control mx-2'
                            {...register(`perKmChargeData[${i}].maxKM`, {
                              onChange: ({ target }) => {
                                setPerKMCharge([...watch("perKmChargeData")]);
                              },
                            })}
                          />

                          <input
                            type='number'
                            placeholder='fare'
                            disabled={viewModal}
                            className='form-control mx-2'
                            {...register(`perKmChargeData[${i}].fare`, {
                              onChange: ({ target }) => {
                                setPerKMCharge([...watch("perKmChargeData")]);
                              },
                            })}
                          />

                          {!viewModal && (
                            <span
                              className='btn btn-danger'
                              onClick={() => {
                                const filterPerKMCharge = perKMCharge.filter(
                                  (perKM, perKMindex) => perKMindex != i,
                                );
                                setValue("perKmChargeData", filterPerKMCharge);
                                setPerKMCharge([...filterPerKMCharge]);
                              }}
                            >
                              <i className='bx bxs-trash' />
                            </span>
                          )}
                        </IconContext.Provider>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Modal.Footer>
                {!viewModal && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      type='submit'
                      isDisabled={viewModal}
                      className='btn btn-outline-primary'
                    >
                      Add Fare
                    </button>
                    {succMsg}
                  </div>
                )}
                <button
                  type='button'
                  className='btn btn-outline-danger'
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
