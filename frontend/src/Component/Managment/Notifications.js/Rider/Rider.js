import { useState } from "react";
import Management_container from "../../../Common/Management_container";
import MaterialReactTable from "material-react-table";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddRiderNotification from "./AddNotification";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";
import {
  filterRiderNotification,
  getRiderNotifications,
} from "../../../../Redux/features/riderNotificationReducer";

export default function RiderNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector(getRiderNotifications);
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorFn: (row) =>
          row.forUsers.length
            ? row.forUsers.map((rider) => rider.name).join(",")
            : "NA",
        header: "For Users",
        id: "forUsers",
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        header: "CreatedAt",
      },
    ],
    []
  );
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (ready) dispatch(filterRiderNotification({}));
    else setReady(true);
  }, [ready]);
  const onSubmit = (data) => {
    dispatch(filterRiderNotification(data));
  };

  return (
    <Management_container title={"Notification To Rider"}>
      {isOpen && <AddRiderNotification show={isOpen} setShow={setIsOpen} />}
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-right">
                  <button
                    class="btn btn-primary"
                    onClick={() => setIsOpen(true)}
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
                    <label class="form-label">From :</label>
                    <input
                      className="form-control"
                      type="date"
                      {...register("from")}
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">To :</label>
                    <input
                      className="form-control"
                      type="date"
                      {...register("to")}
                    />
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
                data={notifications}
                enableRowActions
                enableRowNumbers
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    size: 100,
                    muiTableHeadCellProps: {
                      align: "center", //change head cell props
                    },
                  },
                  "mrt-row-numbers": {
                    header: "Sr No",
                    muiTableHeadCellProps: {
                      sx: {
                        fontSize: "1.2rem",
                      },
                    },
                  },
                }}
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
                      onClick={() => {}}
                      className="btn btn-icon btn-sm btn-info rounded-pill"
                    >
                      <i className="bx bxs-edit-alt" />
                    </button>
                    <button
                      onClick={() => {}}
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
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
