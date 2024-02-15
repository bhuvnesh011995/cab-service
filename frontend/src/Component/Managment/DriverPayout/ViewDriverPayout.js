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
              <strong>Status</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.status}</p>
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
