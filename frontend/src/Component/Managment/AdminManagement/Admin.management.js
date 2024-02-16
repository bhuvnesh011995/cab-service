import { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminManagement.css";
import Management_container from "../../Common/Management_container";

import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import moment from "moment/moment";
import AddNew from "./AddNew";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminStatus,
  deleteAdmin,
  fetchAdminById,
  fetchAdmins,
  getAllAdmins,
} from "../../../Redux/features/adminReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import {
  openModal,
  showDeleteModal,
  url,
  status as deleteModalStatus,
  closeModal,
  doneDelete,
} from "../../../Redux/features/deleteModalReducer";
import { useForm } from "react-hook-form";

export default function AdminManagement() {
  const { handleSubmit, reset, register } = useForm();
  const show = useSelector(showDeleteModal);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const dispatch = useDispatch();
  const AllAdmins = useSelector(getAllAdmins);
  const status = useSelector((state) => state.admins.status);
  const error = useSelector((state) => state.admins.error);
  const URL = useSelector(url);
  const id = useSelector((state) => state.delete.id);
  const deleteStatus = useSelector(deleteModalStatus);
  useEffect(() => {
    if (status === "idle") dispatch(fetchAdmins());
    else if (status === "added") {
      toast.success("admin added successfully");
      dispatch(clearAdminStatus());
      setAdminModalOpen(false);
    } else if (status === "updated") {
      toast.success("admin updated succeeful");
      dispatch(clearAdminStatus());
      setAdminModalOpen(false);
    } else if (status === "deleted") {
      toast.success("admin deleted successfully");
      dispatch(clearAdminStatus());
      dispatch(closeModal());
    }
  }, [status, error]);

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteAdmin({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        header: "Created At",
        size: 100,
      },
    ],
    []
  );

  function onSubmit(filter) {
    dispatch(fetchAdmins(filter));
  }

  return (
    <Management_container title={"Admin Users"}>
      {adminModalOpen && (
        <AddNew show={adminModalOpen} setShow={setAdminModalOpen} />
      )}
      {show && <DeleteModalAdv />}
      <div class="row">
        <div class="col-md-12 text-right">
          <button
            class="btn btn-outline-primary"
            onClick={() => setAdminModalOpen(true)}
          >
            Add New
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="justify-content-center row align-items-end mb-5"
          style={{ alignItems: "end" }}
        >
          <div class="col-md-3">
            {" "}
            <label class="form-label">Name :</label>
            <input
              placeholder="Enter Name"
              className="form-control"
              type="text"
              {...register("name")}
            />
          </div>
          <div class="col-md-3">
            {" "}
            <label class="form-label">Username :</label>
            <input
              className="form-control"
              placeholder="Enter Username"
              type="text"
              {...register("username")}
            />
          </div>
          <div class="col-md-3">
            {" "}
            <label class="form-label">Status :</label>
            <select {...register("status")} className="form-control">
              <option value="">Choose...</option>
              <option value={"ACTIVE"}>Active</option>
              <option value={"INACTIVE"}>Inactive</option>
            </select>
          </div>
          <div class="col-md-3">
            {" "}
            <label class="form-label">From :</label>
            <input className="form-control" type="date" {...register("from")} />
          </div>
          <div class="col-md-3">
            <label class="form-label">To :</label>
            <input className="form-control" type="date" {...register("to")} />
          </div>{" "}
          <div class="col-md-3">
            <button class="btn btn-primary me-3">Search</button>
            <button onClick={() => reset()} class="btn btn-danger me-3">
              Reset
            </button>
          </div>
        </form>{" "}
      </div>

      <MaterialReactTable
        columns={columns}
        data={AllAdmins}
        enableRowNumbers
        rowNumberMode="static"
        enableRowActions
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <div className="hstack gap-2 fs-1">
            <button
              onClick={() => {}}
              className="btn btn-icon btn-sm btn-warning rounded-pill"
            >
              <i className="mdi mdi-eye"></i>
            </button>
            <button
              onClick={() => {
                dispatch(fetchAdminById(row.original._id));
                setAdminModalOpen(true);
              }}
              className="btn btn-icon btn-sm btn-info rounded-pill"
            >
              <i className="bx bxs-edit-alt" />
            </button>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    url: `${BASE_URL}/admin/${row.original._id}`,
                    id: row.original._id,
                  })
                );
              }}
              className="btn btn-icon btn-sm btn-danger rounded-pill"
            >
              <i className="bx bxs-trash" />
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
    </Management_container>
  );
}
