import { Modal } from "react-bootstrap";

export default function AddRiderNotification({ show, setShow }) {
  return (
    <Modal size="md" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Rider Notification</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Title :</label>
            </div>
            <div className="col-md-9">
              <input placeholder="Enter Title" className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">For Users :</label>
            </div>
            <div className="col-md-9">
              <select className="form-control">
                <option value={""}>choose...</option>
                <option value={"Rider"}>Rider</option>
                <option value={"Driver"}>Driver</option>
                <option value={"Admin"}>Admin</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Notification :</label>
            </div>
            <div className="col-md-9">
              <textarea className="form-control" rows={3}></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Status :</label>
            </div>
            <div className="col-md-9">
              <select className="form-control">
                <option value={""}>Choose...</option>
                <option value={"ACTIVE"}>Active</option>
                <option value={"INACTIVE"}>Inactive</option>
              </select>{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShow(false)}
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Notification
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
