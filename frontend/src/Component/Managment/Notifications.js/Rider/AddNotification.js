import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import {
  fetchRiders,
  getRiders,
} from "../../../../Redux/features/riderReducer";
import { useMemo } from "react";

export default function AddRiderNotification({ show, setShow }) {
  const [ready, setReady] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const dispatch = useDispatch();
  const riders = useSelector(getRiders);
  const ridersOptions = useMemo(
    () => riders.map((rider) => ({ value: rider._id, label: rider.name })),
    [riders]
  );
  useEffect(() => {
    if (ready) dispatch(fetchRiders());
    else setReady(true);
  }, [ready]);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Modal size="md" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Rider Notification</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Title :</label>
            </div>
            <div className="col-md-9">
              <input placeholder="Enter Title" className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">For Users :</label>
            </div>
            <div className="col-md-9">
              <Controller
                name="forUsers"
                rules={{ required: "this is required field" }}
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    closeMenuOnSelect={false}
                    options={ridersOptions}
                    isMulti
                  />
                )}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Notification :</label>
            </div>
            <div className="col-md-9">
              <textarea className="form-control" rows={3}></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Status :</label>
            </div>
            <div className="col-md-9">
              <select className="form-control">
                <option value={""}>Choose...</option>
                <option value={"ACTIVE"}>Active</option>
                <option value={"INACTIVE"}>Inactive</option>
              </select>{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShow(false)}
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Notification
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
