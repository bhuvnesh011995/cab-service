import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { viewTaxes } from "../../../Redux/features/taxReducer";
export default function ViewTaxManagement({ show, setShow }) {
  const viewData = useSelector(viewTaxes);
  console.log("viewData", viewData);
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View TaxManagememnt</Modal.Title>
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
        </div>

        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong>TaxType</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.taxType}</p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4">
            <p>
              <strong>Title</strong>
            </p>
          </div>
          <div className="col-md-8">
            <p>{viewData.title}</p>
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
