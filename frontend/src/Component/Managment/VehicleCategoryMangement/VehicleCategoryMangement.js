import { useEffect, useMemo, useState } from "react";
import Management_container from "../../Common/Management_container";

import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import AddVehicleCategory from "../VehicleCategoryMangement/AddVehicleCategory";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { toast } from "react-toastify";
import { getPermissions } from "../../../Redux/features/authReducer";
import {
  cleanVehicleCategoryStatus,
  deleteVehicleCategory,
  fetchVehicleCategory,
  filterVehicleCategory,
  getAllVehicleCategory,
  getViewVehicleCategory,
  updateVehicleCategoryById,
} from "../../../Redux/features/vehicleCategoryReducer";
import { useDispatch, useSelector } from "react-redux";
import ViewVehicleCategory from "./ViewVehicleCategory";
import { useForm } from "react-hook-form";

export default function VehicleCategoryManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState(null);
  const [ready, setReady] = useState(false);
  const permissions = useSelector(getPermissions);
  const { reset, handleSubmit, register } = useForm();

  useEffect(() => {
    dispatch(fetchVehicleCategory());
  }, []);

  const vehicleCategoryData = useSelector(getAllVehicleCategory);
  const vehicleCategoryStatus = useSelector(
    (state) => state.vehicleCategory.status
  );
  const message = useSelector((state) => state.vehicleCategory.message);

  useEffect(() => {
    if (vehicleCategoryStatus === "deleted") {
      setIsOpen(false);
      toast.success(message);
      dispatch(cleanVehicleCategoryStatus());
    } else if (vehicleCategoryStatus === "added") {
      setShow(false);
      toast.success(message);
      dispatch(cleanVehicleCategoryStatus());
    } else if (vehicleCategoryStatus === "update") {
      setShow(false);
      toast.success("updated");
      dispatch(cleanVehicleCategoryStatus());
    }
  }, [vehicleCategoryStatus]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicleCategory",
        header: "Name",
      },
      {
        accessorFn: (row) => row.createdAt?.slice(0, 10),
        id: "createdAt",
        header: "createdAt",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
      },
    ],
    []
  );

  function handleDelete(rowId) {
    dispatch(deleteVehicleCategory(rowId));
  }

  function onSubmit(data) {
    dispatch(filterVehicleCategory(data));
  }

  function handleReset() {
    reset();
  }
  return (
    <Management_container title={"VehicleCategory"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={handleDelete}
              arg={id}
            />
            {show && (
              <AddVehicleCategory
                show={show}
                setShow={setShow}
                viewData={updateData}
                setViewData={setUpdateData}
              />
            )}
            {openView && (
              <ViewVehicleCategory show={openView} setShow={setOpenView} />
            )}
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-right">
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => setShow(true)}
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
                      <label class="form-label">vehicleCategory</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("vehicleCategory")}
                      />
                    </div>
                    <div className="col-md-3">
                      <label>Status: </label>
                      <select
                        name="status"
                        className="form-control select2-templating "
                        {...register("status")}
                      >
                        <option value="">choose...</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <button class="btn btn-primary me-3" type="submit">
                        Search
                      </button>
                      <button class="btn btn-danger me-3" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </div>{" "}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(permissions.includes("All") || permissions.includes("viewTable")) && (
        <MaterialReactTable
          columns={columns || []}
          data={vehicleCategoryData || []}
          enableRowNumbers={true}
          rowNumberDisplayMode="static"
          enableRowActions
          positionActionsColumn={"last"}
          renderRowActions={({ row, table }) => (
            <div className="hstack gap-2 fs-1">
              <button
                onClick={() => {
                  dispatch(getViewVehicleCategory({ id: row.original._id }));
                  setOpenView(true);
                }}
                className="btn btn-icon btn-sm btn-warning rounded-pill"
              >
                <i className="mdi mdi-eye"></i>
              </button>
              <button
                onClick={() => {
                  dispatch(updateVehicleCategoryById({ id: row.original._id }));
                  setShow(true);
                }}
                className="btn btn-icon btn-sm btn-info rounded-pill"
              >
                <i className="bx bxs-edit-alt" />
              </button>
              <button
                onClick={() => {
                  setDeleteInfo({
                    message: `Do You Really Want To Delete ${row.original?.vehicleCategory}`,
                    header: "Delete Vehicle Category",
                  });
                  setIsOpen(true);
                  setId(row.original._id);
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
      )}
    </Management_container>
  );
}
