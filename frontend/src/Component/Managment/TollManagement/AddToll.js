import AddTollMap from "./AddTollMap";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  addTollReducer,
  emptySelectedToll,
  getSelectedToll,
  getSelectedTollReducer,
} from "../../../Redux/features/tollReducer";
import { useDispatch, useSelector } from "react-redux";

export default function AddToll({ isOpen, setIsOpen, tollId, viewToll }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors, dirtyFields },
  } = useForm();
  const [marker, setMarker] = useState(null);
  const dispatch = useDispatch();
  const selectedToll = useSelector(getSelectedToll);

  useEffect(() => {
    if (marker) {
      setValue("lat", marker?.lat);
      setValue("lng", marker?.lng);
    }
    if (tollId) {
      dispatch(getSelectedTollReducer(tollId));
    }
  }, [marker]);

  useEffect(() => {
    if (selectedToll) {
      if (!marker) reset(selectedToll);
    }
  }, [selectedToll]);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(emptySelectedToll());
  };

  const addToll = async (data) => {
    const dataObj = { ...data, ...marker };
    dispatch(addTollReducer(dataObj));
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {" "}
          {tollId ? (viewToll ? "View " : "Update ") : "Add "}Toll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-lg-13'>
            <div className='card'>
              <div className='card-body'>
                {!viewToll && (
                  <AddTollMap market={marker} setMarker={setMarker} />
                )}
                <div className='row'>
                  <form onSubmit={handleSubmit(addToll)}>
                    <div>
                      <div className='m-3'>
                        <label className='form-label'>Title :</label>
                        <input
                          disabled={viewToll}
                          className='form-control'
                          type={"text"}
                          {...register("title", {
                            required: "Please Enter Title",
                          })}
                          placeholder={"title"}
                        />
                        {errors?.title && (
                          <span className='text-danger'>
                            {errors.title.message}
                          </span>
                        )}
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='row'>
                            <div className='m-3'>
                              <label className='form-label'>Latitude :</label>
                              <input
                                disabled
                                // value={marker?.lat}
                                className='form-control'
                                type={"text"}
                                {...register("lat", {
                                  required: "Please Select Latitude",
                                })}
                                placeholder={"latitude"}
                              />
                              {errors?.lat && (
                                <span className='text-danger'>
                                  {errors.lat.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='row'>
                            <div className='m-3'>
                              <label className='form-label'>Longitude :</label>
                              <input
                                disabled
                                // value={marker?.lng}
                                className='form-control'
                                type={"text"}
                                {...register("lng", {
                                  required: "Please Select Longitude",
                                })}
                                placeholder={"longitude"}
                              />
                              {errors?.lng && (
                                <span className='text-danger'>
                                  {errors.lng.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='m-3'>
                      <label className='form-label'>Amount :</label>
                      <input
                        disabled={viewToll}
                        className='form-control'
                        type={"number"}
                        {...register("amount", {
                          required: "Please Enter Amount",
                        })}
                        placeholder={"amount"}
                      />
                      {errors?.amount && (
                        <span className='text-danger'>
                          {errors.amount.message}
                        </span>
                      )}
                    </div>

                    <div className='m-3'>
                      <label className='form-label'>Status : </label>
                      <select
                        disabled={viewToll}
                        style={{ width: "200px" }}
                        name='selectedStatus'
                        {...register("status")}
                        className='form-select'
                      >
                        <option value=''>select</option>
                        <option value='INACTIVE'>Inactive</option>
                        <option value='ACTIVE'>Active</option>
                      </select>
                    </div>
                    <Modal.Footer>
                      {!viewToll && (
                        <button
                          type='submit'
                          className='btn me-3 btn-outline-primary waves-effect waves-light'
                          disabled={viewToll}
                        >
                          {tollId ? "Update " : "Add "}Toll
                        </button>
                      )}
                      <button
                        type='button'
                        className='btn me-3 btn-outline-danger waves-effect waves-light'
                      >
                        Cancel
                      </button>
                    </Modal.Footer>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
