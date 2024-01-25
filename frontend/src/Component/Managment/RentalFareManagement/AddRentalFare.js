import { useEffect, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import {
  fetchVehicleType,
  getAllVehicleType,
} from "../../../Redux/features/vehicleTypeReducer";
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
  getAllPackages,
  getPackages,
} from "../../../Redux/features/packageReducer";
import { IconContext } from "react-icons";
import {
  addRentalReducer,
  emptySelectedRental,
  getSelectedRental,
  getSelectedRentalReducer,
} from "../../../Redux/features/rentalFareReducer";
const initialState = [{ minKM: null, maxKM: null, fare: null }];

let url = BASE_URL + "/rentalPackage/";
export default function AddRentalFare({ show, setShow, viewModal, id }) {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);
  const vehicleTypes = useSelector(getAllVehicleType);
  const packages = useSelector(getPackages);
  const [perKMCharge, setPerKMCharge] = useState(initialState);
  const selectedRentalFare = useSelector(getSelectedRental);

  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(getSelectedRentalReducer(id));
    }
    dispatch(fetchCountries());
    dispatch(fetchVehicleType());
    dispatch(getAllPackages());
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

  useEffect(() => {
    if (selectedRentalFare) reset(selectedRentalFare);
    else {
      setPerKMCharge([...initialState]);
      reset({});
    }
    if (selectedRentalFare?.perKmChargeData) {
      setPerKMCharge([...selectedRentalFare.perKmChargeData]);
    }
  }, [selectedRentalFare]);

  function handleClick(e) {
    setPerKMCharge([...perKMCharge, ...initialState]);
  }

  const handleClose = () => {
    setShow(false);
    dispatch(emptySelectedRental());
  };

  const addNewRental = (data) => {
    dispatch(addRentalReducer(data));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>
          {viewModal ? "View" : id ? "Update" : "Add New"} Rental Fare
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
            <div class='card'>
              <div class='card-body'>
                <form onSubmit={handleSubmit(addNewRental)}>
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
                              country._id == watch("country") &&
                              watch("country")
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
                        {...register("state", {
                          required: "Please Select State",
                        })}
                        className='form-select'
                      >
                        <option value=''>select</option>
                        {states.map((state) => (
                          <option
                            value={state._id}
                            selected={
                              state._id == watch("state") && watch("state")
                            }
                          >
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors?.state && (
                        <span className='text-danger'>
                          {errors.state.message}
                        </span>
                      )}
                    </div>

                    <div className='m-3'>
                      <label className='form-label'>City</label>
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
                          <option
                            value={city._id}
                            selected={
                              city._id == watch("city") && watch("city")
                            }
                          >
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors?.city && (
                        <span className='text-danger'>
                          {errors.city.message}
                        </span>
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
                      <label className='form-label'>Package</label>
                      <select
                        disabled={viewModal}
                        style={{ width: "200px" }}
                        name='selectedStatus'
                        className='form-select'
                        {...register("package", {
                          required: "Please Select Package",
                        })}
                      >
                        <option value=''>select</option>
                        {packages.map((packageData) => (
                          <option
                            value={packageData._id}
                            selected={
                              packageData._id == watch("package") &&
                              watch("package")
                            }
                          >
                            {packageData.name}
                          </option>
                        ))}
                      </select>
                      {errors?.package && (
                        <span className='text-danger'>
                          {errors.package.message}
                        </span>
                      )}
                    </div>
                    <div className='m-3'>
                      <label className='form-label'>Package Fare : </label>
                      <input
                        disabled={viewModal}
                        className='form-control'
                        {...register("packageFare", {
                          required: "Please Enter Package Fare",
                        })}
                        type={"number"}
                        placeholder={"Package Fare"}
                      />
                      {errors?.packageFare && (
                        <span className='text-danger'>
                          {errors.packageFare.message}
                        </span>
                      )}
                    </div>
                    <div className='m-3'>
                      <label className='form-label'>Minimum Charge : </label>
                      <input
                        disabled={viewModal}
                        className='form-control'
                        {...register("minCharge", {
                          required: "Please Enter Minimum Charge",
                        })}
                        type={"number"}
                        placeholder={"Minimum Charge"}
                      />
                      {errors?.minCharge && (
                        <span className='text-danger'>
                          {errors.minCharge.message}
                        </span>
                      )}
                    </div>
                    <div className='m-3'>
                      <label className='form-label'>
                        Per Minimum Charge :{" "}
                      </label>
                      <input
                        disabled={viewModal}
                        className='form-control'
                        {...register("perMinCharge", {
                          required: "Please Enter Per Minimum Charge",
                        })}
                        type={"number"}
                        placeholder={"Per Minimum Charge"}
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
                      <label className='form-label'>
                        Admin Commission Type
                      </label>
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
                                    setPerKMCharge([
                                      ...watch("perKmChargeData"),
                                    ]);
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
                                    setPerKMCharge([
                                      ...watch("perKmChargeData"),
                                    ]);
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
                                    setPerKMCharge([
                                      ...watch("perKmChargeData"),
                                    ]);
                                  },
                                })}
                              />

                              {!viewModal && (
                                <span
                                  className='btn btn-danger'
                                  onClick={() => {
                                    const filterPerKMCharge =
                                      perKMCharge.filter(
                                        (perKM, perKMindex) => perKMindex != i,
                                      );
                                    setValue(
                                      "perKmChargeData",
                                      filterPerKMCharge,
                                    );
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
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          type='submit'
                          isDisabled={viewModal}
                          className='btn btn-outline-primary'
                        >
                          {id ? "Update" : "Add"} Fare
                        </button>
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
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
