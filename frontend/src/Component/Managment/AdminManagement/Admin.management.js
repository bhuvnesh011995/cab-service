import { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminManagement.css";
import Management_container from "../../Common/Management_container";
import Filter_Option from "../../Common/Filter_option";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
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
const initialFilter = {
  name: "",
  username: "",
  status: "",
  from: "",
  to: "",
};
// let url = BASE_URL + "/admin/filter/";
export default function AdminManagement() {
  const show = useSelector(showDeleteModal);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
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
    [],
  );

  function handleSubmit(e) {
    dispatch(fetchAdmins(filter));
  }

  return (
    <Management_container title={"Admin Users"}>
      {adminModalOpen && (
        <AddNew show={adminModalOpen} setShow={setAdminModalOpen} />
      )}
      {show && <DeleteModalAdv />}
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => setAdminModalOpen(true)}
                  title={"Add Admin"}
                />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                options={["name", "username", "status", "from", "to"]}
              />
            </div>
          </div>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={AllAdmins}
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
                dispatch(fetchAdminById(row.original._id));
                setAdminModalOpen(true);
              }}
              className='btn btn-icon btn-sm btn-info rounded-pill'
            >
              <i className='bx bxs-edit-alt' />
            </button>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    url: `${BASE_URL}/admin/${row.original._id}`,
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
    </Management_container>
  );
}
