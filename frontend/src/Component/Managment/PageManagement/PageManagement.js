import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { AddNewPage } from "./AddPage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPageStatus,
  deletePage,
  filterPage,
  getPageError,
  getPageStatus,
  getPages,
  pageToUpdate,
} from "../../../Redux/features/pageReducer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  showDeleteModal,
  status as deleteModalStatus,
  url,
  doneDelete,
  openModal,
  closeModal,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import BASE_URL from "../../../config/config";

export default function PageManagement() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const pages = useSelector(getPages);
  const error = useSelector(getPageError);
  const status = useSelector(getPageStatus);

  const show = useSelector(showDeleteModal);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deletePage({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  useEffect(() => {
    if (ready) dispatch(filterPage({}));
    else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "added") {
      toast.success("page added successfully");
      setIsOpen(false);
      dispatch(clearPageStatus());
    } else if (status === "updated") {
      toast.success("page updated successfully");
      setIsOpen(false);
      dispatch(clearPageStatus);
    } else if (status === "deleted") {
      toast.success("page deleted successfully");
      dispatch(clearPageStatus());
      dispatch(closeModal());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearPageStatus());
    }
  }, [status, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "metaKey",
        header: "Meta Key",
        size: 80,
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        header: "Created At",
      },
    ],
    [],
  );

  function onSubmit(data) {
    dispatch(filterPage(data));
  }

  return (
    <Management_container title={"Page Management"}>
      {show && <DeleteModalAdv />}
      {isOpen && <AddNewPage show={isOpen} setShow={setIsOpen} />}
      <div class='row'>
        <div class='col-lg-12'>
          <div class='card'>
            <div class='card-body'>
              <div className='text-right'>
                <button
                  className='btn btn-primary'
                  onClick={() => setIsOpen(true)}
                >
                  Add New
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    {...register("search")}
                    className='form-control-md me-3 rounded-pill'
                    placeholder='Search...'
                  />
                  <button
                    type='submit'
                    className='btn btn-md btn-primary rounded-pill'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <MaterialReactTable
              columns={columns}
              data={pages}
              enableRowNumbers
              rowNumberMode='static'
              enableRowActions
              positionActionsColumn={"last"}
              renderRowActions={({ row, table }) => (
                <div className='hstack gap-2 fs-1'>
                  <button
                    onClick={() => {}}
                    className='btn btn-icon btn-sm btn-warning rounded-pill'
                  >
                    <i className='mdi mdi-eye'></i>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(pageToUpdate({ id: row.original._id }));
                      setIsOpen(true);
                    }}
                    className='btn btn-icon btn-sm btn-info rounded-pill'
                  >
                    <i className='bx bxs-edit-alt' />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        openModal({
                          url: `${BASE_URL}/page/${row.original._id}`,
                          id: row.original._id,
                        }),
                      );
                    }}
                    className='btn btn-icon btn-sm btn-danger rounded-pill'
                  >
                    <i className='bx bxs-trash' />
                  </button>
                </div>
              )}
              muiTableProps={{
                sx: {
                  border: "1px solid rgba(232, 237, 234, 1)",
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  border: "1px solid rgba(232, 237, 234, 1)",
                },
              }}
              muiTableBodyCellProps={{
                sx: {
                  border: "1px solid rgba(232, 237, 234, 1)",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Management_container>
  );
}
