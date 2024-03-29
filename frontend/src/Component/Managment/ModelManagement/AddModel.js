import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import {
  addModel,
  cleanModel,
  getModel,
  status,
  updateModels,
} from "../../../Redux/features/ModelReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManufacturer,
  selectManufacturer,
} from "../../../Redux/features/ManufacturerReducer";

export default function AddModel({ show, setShow }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const manufacturerData = useSelector(selectManufacturer);
  useEffect(() => {
    dispatch(fetchManufacturer());
  }, []);

  const selectModel = useSelector(getModel);
  useEffect(() => {
    if (selectModel) {
      reset(selectModel);
    }
  }, [selectModel]);

  const modelStatus = useSelector(status);
  useEffect(() => {
    return () => {
      if (modelStatus === "fetched") dispatch(cleanModel());
    };
  }, [modelStatus]);

  const onSubmit = useCallback(
    async (data) => {
      if (!selectModel) {
        dispatch(addModel(data));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = data[field]));

          dispatch(updateModels({ id: selectModel._id, newData: obj }));
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
        <Modal.Title>
          {selectModel ? "Update Modal" : "Add New Modal"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label>Manufacturer</label>
                <Controller
                  control={control}
                  name="manufacturer"
                  rules={{ required: "this is required field" }}
                  render={({ field }) => (
                    <select {...field} className="form-control">
                      <option value="">Choose</option>
                      {manufacturerData.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                />

                {errors.manufacturer && (
                  <span style={{ color: "red" }}>
                    {errors.manufacturer.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: "this is Required field" })}
                  className="form-control"
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label>Status</label>
                <select
                  name="status"
                  {...register("status", {
                    required: "this is Required field",
                  })}
                  className="form-control"
                >
                  <option>Choose</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>

                {errors.status && (
                  <span style={{ color: "red" }}>{errors.status.message}</span>
                )}
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success">
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
