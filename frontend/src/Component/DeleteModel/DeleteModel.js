import { Modal } from "react-bootstrap";

export default function DeleteModal({
  show,
  setShow,
  info,
  handleDelete,
  arg,
}) {
  return show ? (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{info?.header ?? "Delete Modal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{info?.message ?? "Do you really want to delete"}</span>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(arg)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  ) : null;
}
