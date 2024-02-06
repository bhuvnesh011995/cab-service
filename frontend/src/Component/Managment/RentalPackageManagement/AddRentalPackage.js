import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addPackageReducer,
  emptySelectedPackage,
  getSelectedPackage,
  getSelectedPackageReducer,
} from "../../../Redux/features/packageReducer";
import { useEffect } from "react";

export default function AddRentalPackage({ isOpen, setIsOpen, id, viewModal }) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const selectedPackage = useSelector(getSelectedPackage);

  const addPackage = (data) => {
    dispatch(addPackageReducer(data));
    handleClose();
  };

  useEffect(() => {
    if (id) dispatch(getSelectedPackageReducer(id));
  }, []);

  useEffect(() => {
    if (selectedPackage) reset(selectedPackage);
    else reset({});
  }, [selectedPackage]);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(emptySelectedPackage());
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Package</Modal.Title>
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
          <div class='col-lg-12'>
            <div class='card'>
              <div class='card-body'>
                <form onSubmit={handleSubmit(addPackage)}>
                  <div className='m-3'>
                    <label className='form-label'>Name :</label>
                    <input
                      disabled={viewModal}
                      className='form-control'
                      {...register("name", { required: "Please Enter Name" })}
                      type={"text"}
                      placeholder={"Enter Name"}
                    />
                    {errors?.name && (
                      <span className='text-danger'>
                        {errors?.name.message}
                      </span>
                    )}
                  </div>
                  <div className='m-3'>
                    <label className='form-label'>Max Duration :</label>
                    <input
                      disabled={viewModal}
                      className='form-control'
                      {...register("maxDuration", {
                        required: "Please Max Duration",
                      })}
                      type={"text"}
                      placeholder={"Enter Max Duration"}
                    />
                    {errors?.maxDuration && (
                      <span className='text-danger'>
                        {errors?.maxDuration.message}
                      </span>
                    )}
                  </div>
                  <div className='m-3'>
                    <label className='form-label'>Max Distance :</label>
                    <input
                      disabled={viewModal}
                      className='form-control'
                      {...register("maxDistance", {
                        required: "Please Max Distance",
                      })}
                      type={"text"}
                      placeholder={"Enter Max Distance"}
                    />
                    {errors?.maxDistance && (
                      <span className='text-danger'>
                        {errors?.maxDistance.message}
                      </span>
                    )}
                  </div>
                  <div className='m-3'>
                    <label className='form-label'>Status</label>
                    <select
                      disabled={viewModal}
                      {...register("status")}
                      style={{ width: "200px" }}
                      className='form-select'
                    >
                      <option value=''>select</option>
                      <option value='INACTIVE'>Inactive</option>
                      <option value='ACTIVE'>Active</option>
                    </select>
                  </div>
                  <div>
                    {!viewModal && (
                      <button
                        type='submit'
                        className='btn btn-outline-primary mx-2'
                      >
                        {id ? "Update" : "Add"}
                      </button>
                    )}
                    <button
                      type='button'
                      className='btn btn-outline-danger mx-2'
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Modal.Footer></Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
