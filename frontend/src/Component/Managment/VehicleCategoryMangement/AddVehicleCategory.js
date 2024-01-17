import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVehicleCategory, updateVehicleCategory, getVehicleCategory , cleanVehicleCategory} from "../../../Redux/features/vehicleCategoryReducer";
const url = BASE_URL + '/vehicleCategory/'
const api = BASE_URL + '/vehicleCategory/:id'

export default function AddVehicleCategory({ show, setShow
}) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,dirtyFields,isDirty }
  } = useForm();

  const selectVehicleCategory = useSelector(getVehicleCategory)
  useEffect(() => {
    if (selectVehicleCategory) {
      reset(selectVehicleCategory)
    }
  }, [selectVehicleCategory])
  const vehicleCategoryStatus = useSelector(
    (state) => state.vehicleCategory.status
  );
  useEffect(() => {
    return () => {
      if (vehicleCategoryStatus === "fetched") dispatch(cleanVehicleCategory());
    };
  }, [vehicleCategoryStatus]);

  const onSubmit = useCallback(
    async (data) => {
      if (!selectVehicleCategory) {
        dispatch(addVehicleCategory(data));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = data[field]));

          dispatch(updateVehicleCategory({ id:selectVehicleCategory._id, newData: obj }));
        }
      }
    },
    [isDirty, dirtyFields]
  );


  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New VehicleCategory </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-4">
                <label for="formrow-firstname-input" className="form-label">
                  Category Vehicle
                </label>
                <input type="text" className="form-control select2-templating " style={{ width: "100%" }}  {...register("vehicleCategory", { required: "this is required field" })} />
                {errors.vehicleCategory && (
                    <span style={{ color: "red" }}>{errors.vehicleCategory.message}</span>
                  )} 
              </div>

            </div>
            <div className="col-md-12">
              <div className="mb-4">
                <label for="formrow-firstname-input" className="form-label">
                  Status
                </label>
                <select className="form-control select2-templating " style={{ width: "100%" }}  {...register("status", { required: "this is required field"})}>
                  <option value={""}>
                    Select
                  </option>
                  <option value={"ACTIVE"}>
                    ACTIVE
                  </option>
                  <option value={"INACTIVE"}>
                    INACTIVE
                  </option>
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

  )
}