import { Modal } from "react-bootstrap";

export default function DeleteModal({
  show,
  setShow,
  info = { header: "Delete Modal", message: "Do you really want to delete" },
  handleDelete,
  arg,
}) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <span>{info.message}</span>
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
  );
}
