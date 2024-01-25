import { useCallback, useEffect, useState } from "react";
import BASE_URL from "../../../config/config";
import ReactSelect from "react-select";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicleType,
  cleanSelectVehicleType,
  getVehicleType,
  updateVehicleType,
} from "../../../Redux/features/vehicleTypeReducer";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
export default function AddVehicleType({ show, setShow }) {
  const [options, setOptions] = useState();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();

  const selectVehicleType = useSelector(getVehicleType);
  useEffect(() => {
    if (selectVehicleType) {
      reset(selectVehicleType);
    }
  }, [selectVehicleType]);
  const vehicleTypeStatus = useSelector((state) => state.vehicleType.status);
  useEffect(() => {
    return () => {
      if (vehicleTypeStatus === "fetched") dispatch(cleanSelectVehicleType());
    };
  }, [vehicleTypeStatus]);

  const onSubmit = useCallback(
    async (formData) => {
      let runMode = formData.runMode?.map((option) => option.value);
      let formDataWithIds = {
        ...formData,
        runMode,
      };
      if (!selectVehicleType) {
        dispatch(addVehicleType(formDataWithIds));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach(
            (field) => (obj[field] = formDataWithIds[field])
          );
          dispatch(
            updateVehicleType({ id: selectVehicleType._id, newData: obj })
          );
        }
      }
    },
    [isDirty, dirtyFields]
  );

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Vehicle Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>file</label>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  name="file"
                  {...register("file", { required: "this is required field" })}
                />
                {errors.file && (
                  <span style={{ color: "red" }}>{errors.file.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-sm"
                  {...register("name", { required: "this is required field" })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Run Modes</label>
                <Controller
                  name="runMode"
                  control={control}
                  defaultValue={options ? [] : undefined}
                  rules={{
                    required: "this is required field",
                    validate: (value) => value.length > 0,
                  }}
                  render={({ field }) => (
                    <ReactSelect
                      options={[
                        { value: "INDIVIDUAL", label: "INDIVIDUAL" },
                        { value: "RENTAL", label: "RENTAL" },
                        { value: "OUTSTATION", label: "OUTSTATION" },
                      ]}
                      isMulti
                      {...field}
                    />
                  )}
                />
                {errors.runMode && (
                  <div style={{ color: "red" }}>{errors.runMode.message}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Seating Name :</label>
                <input
                  type="text"
                  name="seatingName"
                  className="form-control"
                  {...register("seatingCapacityName", {
                    required: "this is required field",
                  })}
                />
                {errors.seatingCapacityName && (
                  <span style={{ color: "red" }}>
                    {errors.seatingCapacityName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Seating Capacity :</label>
                <input
                  type="text"
                  name="seatingCapacity"
                  className="form-control"
                  {...register("seatingCapacity", {
                    required: "this is required field",
                  })}
                />
                {errors.seatingCapacity && (
                  <span style={{ color: "red" }}>
                    {errors.seatingCapacity.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Status</label>
                <select
                  name="status"
                  className="form-control"
                  {...register("status", {
                    required: "this is required field",
                  })}
                >
                  <option value="">Choose</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
                {errors.status && (
                  <span style={{ color: "red" }}>{errors.status.message}</span>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            SAVE
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
