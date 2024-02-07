import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addTax,
  clearTax,
  getTax,
  updateTax,
} from "../../../Redux/features/taxReducer";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AddNew = ({ show, setShow }) => {
  const {
    register,
    watch,
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState(false);
  const tax = useSelector(getTax);
  const dispatch = useDispatch();
  const onSubmit = function (data) {
    if (!tax) dispatch(addTax(data));
    else {
      const updatedFields = Object.keys(dirtyFields);
      if (!updatedFields.length) return toast.info("change some field first");
      let updatedData = {};
      updatedFields.forEach((field) => (updatedData[field] = data[field]));
      dispatch(updateTax({ id: tax._id, data: updatedData }));
    }
  };
  useEffect(() => {
    if (ready && tax) reset(tax);
    else setReady(true);
    return () => {
      if (ready) dispatch(clearTax());
    };
  }, [ready, tax]);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Tax</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Title :</label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("title", { required: "this is required field" })}
                className="form-control"
                placeholder="Enter Tilte"
              />
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Tax Type :</label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("taxType", { required: "this is required field" })}
                className="form-control"
                placeholder="Enter Tax Type"
              />
              {errors.taxType && (
                <span style={{ color: "red" }}>{errors.taxType.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Value :</label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("value", {
                  required: "this is required field",
                  pattern: {
                    value: /^(?:[1-9]|[1-9][0-9]|0)(?:\.\d{1,2})?$/,
                    message: "please enter a valid value in between 0-99",
                  },
                })}
                className="form-control"
                placeholder="Enter Tax Value"
              />
              {errors.value && (
                <span style={{ color: "red" }}>{errors.value.message}</span>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label">Status :</label>{" "}
            </div>
            <div className="col-md-9">
              <select
                {...register("status", {
                  required: "this is required field",
                })}
                className="form-control"
              >
                <option value={""}>Choose...</option>
                <option value={"ACTIVE"}>Active</option>
                <option value={"INACTIVE"}>Inactive</option>
              </select>

              {errors.status && (
                <span style={{ color: "red" }}>{errors.status.message}</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-right">
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
