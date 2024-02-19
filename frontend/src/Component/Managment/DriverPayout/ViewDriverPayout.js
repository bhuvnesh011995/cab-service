import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllViewDriverPayout } from "../../../Redux/features/driverPayoutReducer";
export default function ViewDriverPayout({ show, setShow }) {
  const viewData = useSelector(getAllViewDriverPayout);
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Driver Payout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong> Total Distance</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.totalDistance}</p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong>Total Time</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.totalTime}</p>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Total Free Ride</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.totalFreeRide}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> appliedFare</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.appliedFare}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Toll Fare </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.tollFare}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Tax Fare </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.taxFare}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Booking fee </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.bookingfee}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Trip Commission </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.tripCommission}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Driver Trip Commission</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.driverTripCommission}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> promoCode Amount</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.promocodeAmount}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>Drive Commission</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.driveCommission}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Admin Commission</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.adminCommission}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Admin Hand</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.adminHand}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Driver Hand </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.driverHand}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> Payout Amount </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.payoutAmount}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> WalletAmount </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.walletAmount}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong> CashMoney </strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.cashMoney}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          onClick={() => {
            setShow(false);
          }}
        >
          close{" "}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
