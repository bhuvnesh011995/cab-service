import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  fetchAllDriver,
  getAllDrivers,
} from "../../../../Redux/features/driverReducer";
import {
  updateDriverNotification,
  addDriverNotification,
  clearUpdateData,
  getDriverNotification,
} from "../../../../Redux/features/driverNotificationReducer";

export default function AddDriverNotification({ show, setShow }) {
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
  const riders = useSelector(getAllDrivers);
  const notification = useSelector(getDriverNotification);
  const ridersOptions = useMemo(
    () => riders.map((rider) => ({ value: rider._id, label: rider.name })),
    [riders]
  );
  useEffect(() => {
    if (ready) {
      dispatch(fetchAllDriver());
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (ready && notification) reset(notification);

    return () => {
      if (ready) dispatch(clearUpdateData());
    };
  }, [ready, notification]);

  const onSubmit = (data) => {
    data.forUsers = data.forUsers.map((item) => item.value);
    if (!notification) dispatch(addDriverNotification(data));
    else {
      let updatedFields = Object.keys(dirtyFields);
      if (!updatedFields.length) return toast.info("change at least one field");

      let updatedData = {};
      updatedFields.forEach((field) => (updatedData[field] = data[field]));
      dispatch(
        updateDriverNotification({ id: notification._id, data: updatedData })
      );
    }
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
              <input
                {...register("title", { required: "this is required field" })}
                placeholder="Enter Title"
                className="form-control"
              />
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
              <textarea
                {...register("notification", {
                  required: "this is required field",
                })}
                className="form-control"
                rows={3}
              ></textarea>
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
