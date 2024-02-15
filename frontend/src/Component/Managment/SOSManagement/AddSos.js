import { useEffect, useState } from "react";
import AddTollMap from "../TollManagement/AddTollMap";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addSOSReducer,
  emptySelectedSOS,
  getSelectedSOS,
  getSelectedSOSReducer,
} from "../../../Redux/features/sosManagementReducer";

const initialSos = {
  bookingId: "",
  userType: "",
  userId: "",
  description: "",
};

export default function AddSos({ show, setShow, id, viewModal }) {
  const [marker, setMarker] = useState(null);
  const dispatch = useDispatch();
  const selectedSos = useSelector(getSelectedSOS);

  const {
    register,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (marker) {
      setValue("lat", marker?.lat);
      setValue("lng", marker?.lng);
    }
    if (id) {
      dispatch(getSelectedSOSReducer(id));
    }
  }, [marker]);

  useEffect(() => {
    if (selectedSos) {
      if (!marker) reset(selectedSos);
    }
  }, [selectedSos]);

  const handleClose = () => {
    setShow(false);
    dispatch(emptySelectedSOS());
  };

  const addNewSos = (data) => {
    dispatch(addSOSReducer(data));
    handleClose();
  };

  return (
    <Modal show={show} size='lg' onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {id ? (viewModal ? "View" : "Update") : "Add"} SOS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-lg-12'>
            {!viewModal && <AddTollMap marker={marker} setMarker={setMarker} />}
            <form onSubmit={handleSubmit(addNewSos)}>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='m-3'>
                    <label className='form-label'>Booking ID</label>
                    <select
                      style={{ width: "200px" }}
                      {...register("bookingId", {
                        required: "This field is required",
                      })}
                      disabled={viewModal}
                      className='form-select'
                    >
                      <option value=''>select</option>
                      <option value='USERID'>User Id</option>
                      <option value='USERTYPE'>User Type</option>
                    </select>
                    {errors?.bookingId && (
                      <span className='text-danger'>
                        {errors?.bookingId.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='m-3'>
                    <label className='form-label'>User Type</label>
                    <select
                      style={{ width: "200px" }}
                      {...register("userType", {
                        required: "this field is required",
                      })}
                      disabled={viewModal}
                      className='form-select'
                    >
                      <option value=''>select</option>
                      <option value='Rider'>Rider</option>
                      <option value='Driver'>Driver</option>
                    </select>
                    {errors?.userType && (
                      <span className='text-danger'>
                        {errors?.userType.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='m-3'>
                    <label className='form-label'>User Id</label>
                    <input
                      style={{ width: "200px" }}
                      className='form-control'
                      disabled
                      type={"text"}
                      placeholder={"user ID"}
                      {...register("userId")}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className='col-md-6 m-2'>
                  <div className='row'>
                    <label className='col-md-3 ms-3'>Latitude</label>

                    <input
                      className='col-md-6'
                      placeholder='latitude'
                      disabled
                      value={marker?.lat}
                      {...register("lat")}
                    />
                    {errors?.lat && (
                      <span className='text-danger'>{errors?.lat.message}</span>
                    )}
                  </div>
                </div>
                <div className='col-md-6 m-2'>
                  <div className='row'>
                    <label className='col-md-3 ms-3'>Longitude</label>

                    <input
                      className='col-md-6'
                      placeholder='longitude'
                      disabled
                      value={marker?.lng}
                      {...register("lng")}
                    />
                    {errors?.lng && (
                      <span className='text-danger'>{errors?.lng.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='row'>
                <label className='form-label ms-3'>Description:</label>
                <textarea
                  {...register("description", {
                    required: "Please Enter Description",
                  })}
                  disabled={viewModal}
                  style={{ width: "95%" }}
                  className='ms-4'
                  rows={5}
                ></textarea>
                {errors?.description && (
                  <span className='text-danger'>
                    {errors?.description.message}
                  </span>
                )}
              </div>
              <Modal.Footer>
                {!viewModal && (
                  <button
                    type='submit'
                    className='btn me-3 btn-outline-primary waves-effect waves-light'
                  >
                    {id ? "Update" : "Add"} SOS
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
      </Modal.Body>
    </Modal>
  );
}
