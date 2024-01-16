import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  showDeleteModal,
  url as deleteUrl,
  status as modalStatus,
  deleteSuccess,
  doneDelete,
} from "../Redux/features/deleteModalReducer";
import { useEffect } from "react";
import {
  deleteAdmin,
  status as deleteStatus,
} from "../Redux/features/adminReducer";
import { toast } from "react-toastify";

export default function DeleteModalAdv() {
  const dispatch = useDispatch();
  const show = useSelector(showDeleteModal);
  const url = useSelector(deleteUrl);
  const id = useSelector((state) => state.delete.id);
  const status = useSelector(deleteStatus);
  const deleteModalStatus = useSelector(modalStatus);
  const error = useSelector((state) => state.admins.error);
  useEffect(() => {
    if (status === "deleted") {
      dispatch(closeModal());
    } else if (status === "error") {
      toast.error(error?.message || "error while deleting");
    }
    if (deleteModalStatus === "delete") {
      dispatch(deleteAdmin({ url, id }));
      dispatch(doneDelete());
    }
  }, [status, deleteModalStatus]);
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
