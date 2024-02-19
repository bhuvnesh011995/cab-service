import { useCallback, useEffect } from "react";
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
import { IMAGE_URL } from "../../../config/config";
export default function AddVehicleType({ show, setShow }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const options = [
    { value: "INDIVIDUAL", label: "INDIVIDUAL" },
    { value: "RENTAL", label: "RENTAL" },
    { value: "OUTSTATION", label: "OUTSTATION" },
  ];

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
      console.log("form", formData);
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
            (field) => (obj[field] = formDataWithIds[field]),
          );
          dispatch(
            updateVehicleType({ id: selectVehicleType._id, newData: obj }),
          );
        }
      }
    },
    [isDirty, dirtyFields],
  );

  const openFile = (value) => {
    if (watch(value)[0]?.name) {
      const fileUrl = URL.createObjectURL(watch(value)[0]);
      window.open(fileUrl);
    } else {
      window.open(IMAGE_URL + watch(value));
    }
  };

  return (
    <Modal
      size='lg'
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectVehicleType ? "update Vehicle Type" : "Add New Vehicle Type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>file</label>
                <div className='d-flex'>
                  <input
                    className='form-control form-control-sm'
                    type={
                      watch("file") && watch("file")[0]?.name
                        ? "file"
                        : !watch("file")
                        ? "file"
                        : "text"
                    }
                    name='file'
                    disabled={watch("file")}
                    {...register("file", {
                      required: "this is required field",
                    })}
                  />
                  {watch("file") && (
                    <div className='d-flex'>
                      <span
                        className='text-primary cursor-pointer'
                        onClick={() => openFile("file")}
                      >
                        <i className='mdi mdi-eye'></i>
                      </span>
                      <span
                        onClick={() => setValue("file", "")}
                        className='text-danger cursor-pointer mx-2'
                      >
                        <i className='bx bxs-trash' />
                      </span>
                    </div>
                  )}
                </div>
                {errors.file && (
                  <span style={{ color: "red" }}>{errors.file.message}</span>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  className='form-control form-control-sm'
                  {...register("name", { required: "this is required field" })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>Run Modes</label>
                <Controller
                  name='runMode'
                  control={control}
                  defaultValue={options ? [] : undefined}
                  rules={{
                    required: "this is required field",
                    validate: (value) => value.length > 0,
                  }}
                  render={({ field }) => (
                    <ReactSelect options={options} isMulti {...field} />
                  )}
                />
                {errors.runMode && (
                  <div style={{ color: "red" }}>{errors.runMode.message}</div>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>Seating Name :</label>
                <input
                  type='text'
                  name='seatingName'
                  className='form-control'
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
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>Seating Capacity :</label>
                <input
                  type='text'
                  name='seatingCapacity'
                  className='form-control'
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
            <div className='col-md-6'>
              <div className='mb-3'>
                <label>Status</label>
                <select
                  name='status'
                  className='form-control'
                  {...register("status", {
                    required: "this is required field",
                  })}
                >
                  <option value=''>Choose</option>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='INACTIVE'>INACTIVE</option>
                </select>
                {errors.status && (
                  <span style={{ color: "red" }}>{errors.status.message}</span>
                )}
              </div>
            </div>
          </div>
          <Modal.Footer>
            <button type='submit' className='btn btn-outline-primary'>
              Save
            </button>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
