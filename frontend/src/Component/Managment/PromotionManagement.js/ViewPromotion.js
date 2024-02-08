import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllViewPromotion } from "../../../Redux/features/promotionReducer";
export default function ViewPromotion({ show, setShow }) {
  const viewData = useSelector(getAllViewPromotion);
  console.log("viewData", viewData);
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Model</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong> Name</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.name}</p>
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
              <p>{viewData?.forUser}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>description</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.description}</p>
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
