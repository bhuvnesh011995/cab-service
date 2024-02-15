import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllViewReferral } from "../../../Redux/features/referralReducer";
export default function ViewReferral({ show, setShow }) {
  const viewData = useSelector(getAllViewReferral);
  console.log("viewData", viewData);
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Referral Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong>Status</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.status}</p>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>Country</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.country?.name}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>State</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.state?.name}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>City</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.city?.name}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>forUsers</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData?.forUsers}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>maxAmountToReferrer</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.maxAmountToReferrer}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>maxFreeRideToReferrer</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData?.maxFreeRideToReferrer}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>amountToApplier</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.amountToApplier}</p>
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
