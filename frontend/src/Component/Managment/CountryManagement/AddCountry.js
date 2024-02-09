import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountry,
  clearCountry,
  getCountry,
  updateCountryById,
} from "../../../Redux/features/countryReducer";
import { toast } from "react-toastify";

export default function Addcountry({ show, setShow }) {
  const [ready, setReady] = useState(false);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
    getValues,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const dispatch = useDispatch();
  const country = useSelector(getCountry);

  useEffect(() => {
    if (ready && country) reset(country);
    else setReady(true);

    return () => {
      if (ready) dispatch(clearCountry());
    };
  }, [ready, country]);

  function onSubmit(data) {
    if (!country) {
      dispatch(addCountry(data));
    } else {
      const changedField = Object.keys(dirtyFields);
      let obj = {};
      if (!changedField.length) return toast.info("change some field first");
      changedField.forEach((key) => (obj[key] = data[key]));

      dispatch(updateCountryById({ id: country._id, data: obj }));
    }
  }

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Country </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input
                  {...register("name", { required: "this is required Field" })}
                  className='form-control'
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Country Code</label>
                <input
                  {...register("countryCode", {
                    required: "this is required Field",
                  })}
                  className='form-control'
                />
                {errors.countryCode && (
                  <span style={{ color: "red" }}>
                    {errors.countryCode.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Dial Code</label>
                <input
                  {...register("dialCode", {
                    required: "this is required Field",
                  })}
                  className='form-control'
                />
                {errors.dialCode && (
                  <span style={{ color: "red" }}>
                    {errors.dialCode.message}
                  </span>
                )}
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Status</label>
                <select
                  {...register("status", {
                    required: "this is required field",
                  })}
                  className='form-control'
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
          </div>
          <Modal.Footer>
            <button type='submit' className='btn btn-outline-primary'>
              Add
            </button>
            <button type='button' className='btn btn-outline-danger'>
              Close
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
