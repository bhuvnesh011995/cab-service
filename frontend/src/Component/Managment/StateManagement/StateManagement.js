import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { toast } from "react-toastify";
import AddState from "../StateManagement/AddState";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateStatus,
  deleteState,
  fetchStates,
  filterStates,
  getStates,
  stateError,
  stateForUpdate,
  stateStatus,
} from "../../../Redux/features/stateReducer";
import {
  openModal,
  url,
  status as deleteModalStatus,
  doneDelete,
  showDeleteModal,
  closeModal,
} from "../../../Redux/features/deleteModalReducer";
import BASE_URL from "../../../config/config";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import { useForm } from "react-hook-form";
const initialFilter = {
  name: "",
  country: "",
  status: "",
};

export default function StateManagement() {
  const { handleSubmit, reset, register } = useForm();
  const [filter, setFilter] = useState(initialFilter);
  const [open, setOpen] = useState(false);
  const status = useSelector(stateStatus);
  const dispatch = useDispatch();
  const error = useSelector(stateError);
  const [ready, setReady] = useState(false);
  const states = useSelector(getStates);
  const show = useSelector(showDeleteModal);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);

  
  useEffect(() => {
    if (ready) {
      dispatch(filterStates(filter));
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "updated") {
      toast.success("state updated successfully");
      setOpen(false);
      dispatch(clearStateStatus());
    } else if (status === "added") {
      toast.success("state added successfully");
      setOpen(false);
      dispatch(clearStateStatus());
    } else if (status === "deleted") {
      toast.success("state deleted successfully");
      dispatch(closeModal());
      dispatch(clearStateStatus());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearStateStatus());
    }
  }, [status, error]);

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteState({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "stateCode",
        header: "State Code",
        size: 100,
      },
      {
        accessorFn: (row) => (row.country ? row.country.name : "NA"),
        id: "country",
        header: "Country",
      },
      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
      {
        accessorFn: (row) => moment(row?.createdAt)?.format("ll"),
        id: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  function onSubmit(filter) {
    dispatch(filterStates(filter));
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"STATE MANAGEMENT"}>
      {show && <DeleteModalAdv />}

      {open && <AddState show={open} setShow={setOpen} />}

      <div class="row">
        <div class="col-md-12 text-right">
          <button class="btn btn-outline-primary" onClick={() => setOpen(true)}>
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
            <label class="form-label">Country :</label>
            <input
              placeholder="Enter Country"
              className="form-control"
              type="text"
              {...register("country")}
            />
          </div>
          <div class="col-md-3">
            {" "}
            <label class="form-label">Name :</label>
            <input
              className="form-control"
              placeholder="Enter Name"
              type="text"
              {...register("name")}
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
            <button class="btn btn-primary me-3">Search</button>
            <button onClick={() => reset()} class="btn btn-danger me-3">
              Reset
            </button>
          </div>
        </form>{" "}
      </div>
      <MaterialReactTable
        columns={columns}
        data={states}
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
                dispatch(stateForUpdate({ id: row.original._id }));
                setOpen(true);
              }}
              className="btn btn-icon btn-sm btn-info rounded-pill"
            >
              <i className="bx bxs-edit-alt" />
            </button>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    url: `${BASE_URL}/state/${row.original._id}`,
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
