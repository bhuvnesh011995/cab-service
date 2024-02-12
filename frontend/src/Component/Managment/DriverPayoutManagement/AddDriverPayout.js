import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addManufacturer,
  updateManufacturer,
  getManufacturer,
  cleanManfacturer,
} from "../../../Redux/features/ManufacturerReducer";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
export default function AddDriverPayout({ show, setShow }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();

  const selectManufacturer = useSelector(getManufacturer);
  useEffect(() => {
    if (selectManufacturer) {
      reset(selectManufacturer);
    }
  }, [selectManufacturer]);
  const manufacturerStatus = useSelector((state) => state.manufacturer.status);

  useEffect(() => {
    return () => {
      if (manufacturerStatus === "fetched") dispatch(cleanManfacturer());
    };
  }, [manufacturerStatus]);

  const onSubmit = useCallback(
    async (data) => {
      if (!selectManufacturer) {
        dispatch(addManufacturer(data));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = data[field]));

          dispatch(
            updateManufacturer({ id: selectManufacturer._id, newData: obj })
          );
        }
      }
    },
    [isDirty, dirtyFields]
  );

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New DriverPayout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="needs-validation"
          onSubmit={handleSubmit((formData) => onSubmit(formData))}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>{" "}
            </div>
          </div>
          <button class="btn btn-success" type="submit">
            save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
