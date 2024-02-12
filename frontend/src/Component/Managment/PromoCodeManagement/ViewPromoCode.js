import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllViewPromoCode } from "../../../Redux/features/promoCodeReducer";
export default function ViewPromoCode({ show, setShow }) {
  const viewData = useSelector(getAllViewPromoCode);
  console.log("viewData", viewData);
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View PromoCode</Modal.Title>
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
              <p>{viewData?.forUser}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>Discount Type</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData?.discountType}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>DisCount Value</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData?.discountValue}</p>
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
                <strong>PromoCode</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData?.promoCode}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <p>
                <strong>vehicleType</strong>
              </p>
            </div>
            <div className="col-md-8">
              <p>{viewData.vehicleType?.name}</p>
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
