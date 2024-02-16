import { useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Management_container from "../../Common/Management_container";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanReferralStatus,
  deleteReferral,
  fetchReferral,
  filterReferral,
  getAllReferral,
  getViewReferral,
  status,
  updateReferralById,
} from "../../../Redux/features/referralReducer";
import {
  doneDelete,
  openModal,
  showDeleteModal,
  status as deleteModalStatus,
  closeModal,
  url,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import BASE_URL from "../../../config/config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import moment from "moment";
import AddDriverPayout from "./AddDriverPayout";
import {
  Status,
  cleanDriverPayout,
  deleteDriverPayout,
  fetchDriverPayout,
  filterDriverPayout,
  getAllDriverPayout,
  getViewDriverPayout,
  updateDriverPayoutById,
} from "../../../Redux/features/driverPayoutReducer";
import ViewDriverPayout from "./ViewDriverPayout";
export default function DriverPayoutManagement() {
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const [isOpen, setIsOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const open = useSelector(showDeleteModal);
  const { register, watch, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const driverPayout = useSelector(getAllDriverPayout);
  useEffect(() => {
    dispatch(fetchDriverPayout());
  }, []);

  const driverPayoutStatus = useSelector(Status);

  useEffect(() => {
    if (driverPayoutStatus === "added") {
      toast.success("driverPayout added successfully");
      setIsOpen(false);
      dispatch(cleanDriverPayout());
    } else if (driverPayoutStatus === "deleted") {
      dispatch(closeModal());
      toast.success("DriverPayout delete successfully ");
      dispatch(cleanDriverPayout());
    } else if (driverPayoutStatus === "updated") {
      setIsOpen(false);
      toast.success("updated");
      dispatch(cleanDriverPayout());
    }
  }, [driverPayoutStatus]);

  const columns = useMemo(
    () => [
      { accessorKey: "totalDistance", header: "Total Distance" },
      {
        accessorFn: (row) => moment(row.createdAt)?.format("ll"),
        id: "createdAt",
        header: "Created At",
      },
      { accessorKey: "totalTime", header: "Total Time" },
      { accessorKey: "totalFreeRide", header: "Total FreeRide" },
      { accessorKey: "tollFare", header: "Toll Fare" },
    ],
    []
  );

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteDriverPayout({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  function onSubmit(data) {
    dispatch(filterDriverPayout(data));
  }

  function handleReset() {
    reset();
  }

  return (
    <Management_container title={"Driver Payout Management "}>
      {open && <DeleteModalAdv />}
      {isOpen && <AddDriverPayout show={isOpen} setShow={setIsOpen} />}
      {openView && <ViewDriverPayout show={openView} setShow={setOpenView} />}

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-right">
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => setIsOpen(true)}
                  >
                    Add New
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    class="justify-content-center row align-items-end mb-5"
                    style={{ alignItems: "end" }}
                  >
                    <div class="col-md-3">
                      {" "}
                      <label class="form-label">Title</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("totalDistance")}
                      />
                    </div>

                    <div class="col-md-3">
                      {" "}
                      <label class="form-label">taxFare</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("taxFare")}
                      />
                    </div>

                    <div class="col-md-3">
                      <button type="submit" className="btn  btn-primary ">
                        Search
                      </button>
                      <button class="btn btn-danger me-3" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </div>{" "}
                </form>
              </div>
              <MaterialReactTable
                columns={columns}
                data={driverPayout || []}
                enableRowActions
                enableRowNumbers
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnActions={false}
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    size: 100,
                    muiTableHeadCellProps: {
                      align: "center",
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
                      onClick={() => {
                        dispatch(getViewDriverPayout({ id: row.original._id }));
                        setOpenView(true);
                      }}
                      className="btn btn-icon btn-sm btn-warning rounded-pill"
                    >
                      <i className="mdi mdi-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          updateDriverPayoutById({ id: row.original._id })
                        );
                        setIsOpen(true);
                      }}
                      className="btn btn-icon btn-sm btn-info rounded-pill"
                    >
                      <i className="bx bxs-edit-alt" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/driverPayout/${row.original._id}`,
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
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
