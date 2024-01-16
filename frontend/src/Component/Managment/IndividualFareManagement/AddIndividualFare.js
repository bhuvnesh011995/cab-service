import Filter_Option from "../../Common/Filter_option";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import { useEffect, useState } from "react";
import "./AddIndividualFare.css";
import BtnDark from "../../Common/Buttons/BtnDark";
import * as RiIcons from "react-icons/ri";
import { IconContext } from "react-icons";
import BASE_URL from "../../../config/config";
import { Modal } from "react-bootstrap";
import axios from "axios";
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
  getSelectedFareData,
  postFare,
  selectedFare,
} from "../../../Redux/features/individualFareReducer";

const initialState = {
  perKMCharge: [{ minKM: null, maxKM: null, fare: null }],
};

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
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const states = useSelector(getStates);
  const countries = useSelector(getCountries);
  const selectedFareData = useSelector(selectedFare);
  const [individualFare, setIndividualFare] = useState(initialState);
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    console.log(selectedFareData);
    if (selectedFareData) reset(selectedFareData);
    if (selectedFareData?.perKmChargeData) {
      individualFare.perKMCharge = selectedFareData.perKmChargeData;
      setIndividualFare(individualFare);
    }
  }, [selectedFareData]);

  useEffect(() => {
    if (fareId) {
      dispatch(getSelectedFareData(fareId));
    }
    dispatch(fetchCountries());
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

  // let list = individualFare?.perKMCharge?.map((ele, i) => {
  //   return (
  //     <IconContext.Provider value={"#fff"}>
  //       <form>
  //         <input
  //           type='number'
  //           index={i}
  //           placeholder='min KM'
  //           value={ele.minKM}
  //           onChange={(e) => {
  //             // let obj = individualFare;
  //             // individualFare.perKMCharge[e.target.getAttribute("index")].minKM =
  //             //   e.target.value;
  //             // setIndividualFare((preVal) => ({ ...preVal, ...obj }));
  //           }}
  //           disabled={viewModal}
  //         />

  //         <input
  //           type='number'
  //           index={i}
  //           placeholder='max KM'
  //           value={ele.maxKM}
  //           onChange={(e) => {
  //             let obj = individualFare;
  //             individualFare.perKMCharge[e.target.getAttribute("index")].maxKM =
  //               e.target.value;
  //             setIndividualFare((preVal) => ({ ...preVal, ...obj }));
  //           }}
  //           disabled={viewModal}
  //         />

  //         <input
  //           type='number'
  //           index={i}
  //           placeholder='fare'
  //           value={ele.fare}
  //           onChange={(e) => {
  //             let obj = individualFare;
  //             individualFare.perKMCharge[e.target.getAttribute("index")].fare =
  //               e.target.value;
  //             setIndividualFare((preVal) => ({ ...preVal, ...obj }));
  //           }}
  //           disabled={viewModal}
  //         />
  //         {!viewModal && (
  //           <RiIcons.RiDeleteBin6Line
  //             index={i}
  //             style={{ cursor: "pointer" }}
  //             onClick={() => console.log("delete")}
  //             size={"20"}
  //           />
  //         )}
  //       </form>
  //     </IconContext.Provider>
  //   );
  // });

  function handleClick(e) {
    e.preventDefault();
    setIndividualFare((preVal) => ({
      ...preVal,
      perKMCharge: [
        ...preVal.perKMCharge,
        { minKM: null, maxKM: null, fare: null },
      ],
    }));
  }

  const addNewFare = async (data) => {
    dispatch(postFare(data));
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {viewModal ? "View" : fareId ? "Update" : "Add New"} Individual Fare
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class='card'>
          <div class='card-body'>
            <form onSubmit={handleSubmit(addNewFare)}>
              <div className='row'>
                <div className='col-lg-2 inputField'>
                  <div className='m-3'>
                    <label className='form-label'>Country</label>
                    <select
                      disabled={viewModal}
                      style={{ width: "200px" }}
                      {...register("country")}
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
                  </div>

                  <div className='m-3'>
                    <label className='form-label'>State</label>
                    <select
                      disabled={viewModal}
                      style={{ width: "200px" }}
                      {...register("state")}
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
                  </div>

                  <div className='m-3'>
                    <label className='form-label'>City</label>
                    <select
                      disabled={viewModal}
                      style={{ width: "200px" }}
                      {...register("city")}
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
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div className='m-3'>
                  <label className='form-label'>Base Fare : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("baseFare")}
                    type={"number"}
                    placeholder={"base Fare"}
                  />
                </div>
                <div className='m-3'>
                  <label className='form-label'>Min Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("minCharge")}
                    type={"number"}
                    placeholder={"Min Charge"}
                  />
                </div>
                <div className='m-3'>
                  <label className='form-label'>Per Min Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("perMinCharge")}
                    type={"number"}
                    placeholder={"Per Min Charge"}
                  />
                </div>
                <div className='m-3'>
                  <label className='form-label'>Cancel Charge : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("cancelCharge")}
                    type={"number"}
                    placeholder={"Cancel Charge"}
                  />
                </div>
                <div className='m-3'>
                  <label className='form-label'>Booking Fee : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("bookingFee")}
                    type={"number"}
                    placeholder={"Booking Fee"}
                  />
                </div>

                <div className='m-3'>
                  <label className='form-label'>Admin Commission Type</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    {...register("adminCommissionType")}
                    className='form-select'
                  >
                    <option value=''>select</option>
                    <option value='FIX'>Fix</option>
                    <option value='PERCENTAGE'>Percentage</option>
                  </select>
                </div>
                <div className='m-3'>
                  <label className='form-label'>Admin Commission : </label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("adminCommission")}
                    type={"number"}
                    placeholder={"Admin Commission"}
                  />
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {!viewModal && (
                  <BtnDark
                    title={"Add More"}
                    handleClick={handleClick}
                    isDisabled={viewModal}
                  />
                )}
                <div className='d-flex flex-column'>
                  <span>Extra Per KM Charge</span>
                  <div>
                    {individualFare?.perKMCharge?.map((ele, i) => (
                      <IconContext.Provider value={"#fff"}>
                        <input
                          type='number'
                          placeholder='min KM'
                          disabled={viewModal}
                          {...register(`perKmChargeData[${i}].minKM`)}
                        />

                        <input
                          type='number'
                          placeholder='max KM'
                          disabled={viewModal}
                          {...register(`perKmChargeData[${i}].maxKM`)}
                        />

                        <input
                          type='number'
                          placeholder='fare'
                          disabled={viewModal}
                          {...register(`perKmChargeData[${i}].fare`)}
                        />
                        {!viewModal && (
                          <RiIcons.RiDeleteBin6Line
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              console.log("boom");
                            }}
                            size={"20"}
                          />
                        )}
                      </IconContext.Provider>
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
                <button type='button' className='btn btn-outline-danger'>
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
