import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  getCountries,
} from "../../../Redux/features/countryReducer";
import { Controller, useForm } from "react-hook-form";
import {
  addState,
  getstate,
  updateStateById,
} from "../../../Redux/features/stateReducer";
import { toast } from "react-toastify";

export default function AddState({ show, setShow }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const countries = useSelector(getCountries);
  const state = useSelector(getstate);
  useEffect(() => {
    if (ready) {
      if (state) reset(state);
      dispatch(fetchCountries());
    } else setReady(true);
  }, [ready, state]);

  function onSubmit(data) {
    if (!state) dispatch(addState(data));
    else {
      let arr = Object.keys(dirtyFields);
      if (!arr.length) return toast.info("change some field first");
      let obj = {};
      arr.forEach((field) => (obj[field] = data[field]));
      dispatch(updateStateById({ id: state._id, data: obj }));
    }
  }
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New State </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Country :</label>
                <Controller
                  name="country"
                  rules={{ required: "this is required field" }}
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="form-control">
                      <option value={""}>Choose...</option>
                      {countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Name :</label>
                <input
                  {...register("name", { required: "this is required field" })}
                  placeholder="Enter State Name"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">State Code</label>
                <input
                  {...register("stateCode", {
                    required: "this is required field",
                  })}
                  placeholder="Enter State Code"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Status :</label>
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
              </div>
            </div>
          </div>

          <div className="text-right">
            <button type="submit" className="btn btn-primary">
              Add State
            </button>
          </div>
        </form>{" "}
      </Modal.Body>
    </Modal>
  );
}
