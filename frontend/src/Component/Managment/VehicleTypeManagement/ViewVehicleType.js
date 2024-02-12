import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllViewVehicleType } from "../../../Redux/features/vehicleTypeReducer";
export default function ViewVehicleType({ show, setShow }) {
  const viewData = useSelector(getAllViewVehicleType);
  console.log("viewDatata", viewData);
  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Model</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row mb-2'>
          <div className='col-md-4'>
            <p>
              <strong> Name</strong>
            </p>
          </div>
          <div className='col-md-8'>
            <p>{viewData?.name}</p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col-md-4'>
            <p>
              <strong>Status</strong>
            </p>
          </div>
          <div className='col-md-8'>
            <p>{viewData?.status}</p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col-md-4'>
            <p>
              <strong>Seating Name </strong>
            </p>
          </div>
          <div className='col-md-8'>
            <p>{viewData?.seatingCapacityName}</p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col-md-4'>
            <p>
              <strong>Run Mode </strong>
            </p>
          </div>
          <div className='col-md-8'>
            <p>{viewData?.runMode}</p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col-md-4'>
            <p>
              <strong>Seating Capacity </strong>
            </p>
          </div>
          <div className='col-md-8'>
            <p>{viewData?.seatingCapacity}</p>
          </div>
        </div>
        <Modal.Footer>
          <button
            className='btn btn-outline-danger'
            onClick={() => {
              setShow(false);
            }}
          >
            close{" "}
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
