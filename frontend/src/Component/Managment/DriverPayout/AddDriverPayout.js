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
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Status,
  addDriverPayout,
  cleanDriverPayout,
  cleanSelectDriverPayout,
  getDriverPayout,
  updateDriverPayout,
} from "../../../Redux/features/driverPayoutReducer";
export default function AddDriverPayout({ show, setShow }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();

  const driverPayout = useSelector(getDriverPayout);
  useEffect(() => {
    if (driverPayout) {
      reset(driverPayout);
    }
  }, [driverPayout]);

  const driverPayoutStatus = useSelector(Status);

  useEffect(() => {
    return () => {
      if (driverPayoutStatus === "fetched") dispatch(cleanSelectDriverPayout());
    };
  }, [driverPayoutStatus]);

  const onSubmit = useCallback(
    async (data) => {
      if (!driverPayout) {
        dispatch(addDriverPayout(data));
      } else {
        let changedField = Object.keys(dirtyFields);
        if (!changedField.length) return toast.info("change some field first");
        else {
          let obj = {};
          changedField.forEach((field) => (obj[field] = data[field]));

          dispatch(updateDriverPayout({ id: driverPayout._id, newData: obj }));
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
                  Total Distance
                </label>
                <Controller
                  control={control}
                  name="totalDistance"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="totalDistance"
                      name="totalDistance"
                      placeholder="Enter totalDistance"
                    />
                  )}
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Total Time
                </label>
                <Controller
                  control={control}
                  name="totalTime"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="totalTime"
                      name="totalTime"
                      placeholder="Enter totalTime"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Total Free Ride
                </label>
                <Controller
                  control={control}
                  name="totalFreeRide"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="totalFreeRide"
                      name="totalFreeRide"
                      placeholder="Enter totalFreeRide"
                    />
                  )}
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Applied Fare
                </label>
                <Controller
                  control={control}
                  name="appliedFare"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="appliedFare"
                      name="appliedFare"
                      placeholder="Enter appliedFare"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Toll Fare
                </label>
                <Controller
                  control={control}
                  name="tollFare"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="tollFare"
                      name="tollFare"
                      placeholder="Enter tollFare"
                    />
                  )}
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Tax Fare
                </label>
                <Controller
                  control={control}
                  name="taxFare"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="taxFare"
                      name="taxFare"
                      placeholder="Enter taxFare"
                    />
                  )}
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Booking fee
                </label>
                <Controller
                  control={control}
                  name="bookingfee"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="bookingfee"
                      name="bookingfee"
                      placeholder="Enter bookingfee"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Trip Commission
                </label>
                <Controller
                  control={control}
                  name="tripCommission"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="tripCommission"
                      name="tripCommission"
                      placeholder="Enter tripCommission"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Driver Trip Commission
                </label>
                <Controller
                  control={control}
                  name="driverTripCommission"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="driverTripCommission"
                      name="driverTripCommission"
                      placeholder="Enter driverTripCommission"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Promocode Amount
                </label>
                <Controller
                  control={control}
                  name="promocodeAmount"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="promocodeAmount"
                      name="promocodeAmount"
                      placeholder="Enter promocodeAmount"
                    />
                  )}
                />
              </div>{" "}
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Driver Commission
                </label>
                <Controller
                  control={control}
                  name="driveCommission"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="driveCommission"
                      name="driveCommission"
                      placeholder="Enter driveCommission"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Admin Commission
                </label>
                <Controller
                  control={control}
                  name="adminCommission"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="adminCommission"
                      name="adminCommission"
                      placeholder="Enter adminCommission"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Admin Hand
                </label>
                <Controller
                  control={control}
                  name="adminHand"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="adminHand"
                      name="adminHand"
                      placeholder="Enter adminHand"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Driver Hand
                </label>
                <Controller
                  control={control}
                  name="driverHand"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="driverHand"
                      name="driverHand"
                      placeholder="Enter driverHand"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Payout amount
                </label>
                <Controller
                  control={control}
                  name="payoutAmount"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="payoutAmount"
                      name="payoutAmount"
                      placeholder="Enter payoutAmount"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Payout Type
                </label>
                <Controller
                  control={control}
                  name="payoutType"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="payoutType"
                      name="payoutType"
                      placeholder="Enter payoutType"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Wallet amount
                </label>
                <Controller
                  control={control}
                  name="walletAmount"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="walletAmount"
                      name="walletAmount"
                      placeholder="Enter walletAmount"
                    />
                  )}
                />
              </div>{" "}
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Cash Money
                </label>
                <Controller
                  control={control}
                  name="cashMoney"
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="form-control"
                      id="cashMoney"
                      name="cashMoney"
                      placeholder="Enter cashMoney"
                    />
                  )}
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
