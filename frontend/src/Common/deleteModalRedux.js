import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  showDeleteModal,
  deleteSuccess,
} from "../Redux/features/deleteModalReducer";

export default function DeleteModalAdv() {
  const dispatch = useDispatch();
  const show = useSelector(showDeleteModal);

  return (
    <Modal show={show} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton />
      <Modal.Title>Delete Modal</Modal.Title>
      <Modal.Body>
        <span>Do You Really Want to Delete ?</span>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteSuccess())}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
