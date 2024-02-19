import { useEffect, useMemo, useState } from "react";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import ViewManufacturer from "./viewManufacturer";
import AddManufacturer from "./AddManufacturer";
import {
  selectManufacturer,
  fetchManufacturer,
  deleteManufacturer,
  updatetManufacturerById,
  status,
  cleanManufaturerStatus,
  filterManufacturer,
  viewManufacturer,
} from "../../../Redux/features/ManufacturerReducer";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { getPermissions } from "../../../Redux/features/authReducer";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function MakeManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const permissions = useSelector(getPermissions);
  const [viewModel, setViewModel] = useState(false);

  const { register, watch, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchManufacturer());
  }, []);

  const manufacturerData = useSelector(selectManufacturer);

  const manufacturerStatus = useSelector(status);
  const message = useSelector((state) => state.manufacturer.message);

  useEffect(() => {
    if (manufacturerStatus === "deleted") {
      setDeleteModal(false);
      toast.success(message);
      dispatch(cleanManufaturerStatus());
    } else if (manufacturerStatus === "added") {
      setIsOpen(false);
      toast.success("added successfully");
    } else if (manufacturerStatus === "updated") {
      setIsOpen(false);
      toast.success("updated");
      dispatch(cleanManufaturerStatus());
    }
  }, [manufacturerStatus]);

  const handleDeleteClick = (manufacturerId) => {
    dispatch(deleteManufacturer(manufacturerId));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
      },
    ],
    []
  );

  function onSubmit(data) {
    dispatch(filterManufacturer(data));
  }

  function handleReset() {
    reset();
  }

  return (
    <Management_container title={"Manufacture"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={deleteModal}
              setShow={setDeleteModal}
              handleDelete={handleDeleteClick}
              arg={id}
            />
            {isOpen && <AddManufacturer show={isOpen} setShow={setIsOpen} />}
            {viewModel && (
              <ViewManufacturer show={viewModel} setShow={setViewModel} />
            )}

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
                      <label class="form-label">name</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("name")}
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
              {/* <Table
        heading={["Sr no", "Name", "Status", "Created At", "Action"]}
        list={list}
      /> */}
              {(permissions.includes("All") ||
                permissions.includes("viewTable")) && (
                <MaterialReactTable
                  columns={columns || []}
                  data={manufacturerData || []}
                  enableRowNumbers={true}
                  rowNumberDisplayMode="static"
                  enableRowActions
                  positionActionsColumn={"last"}
                  renderRowActions={({ row, table }) => (
                    <div className="hstack gap-2 fs-1">
                      <button
                        onClick={() => {
                          dispatch(viewManufacturer({ id: row.original._id }));
                          setViewModel(true);
                        }}
                        className="btn btn-icon btn-sm btn-warning rounded-pill"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            updatetManufacturerById({ id: row.original._id })
                          );
                          setIsOpen(true);
                        }}
                        className="btn btn-icon btn-sm btn-info rounded-pill"
                      >
                        <i className="bx bxs-edit-alt" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteInfo({
                            message: `Do You Really Want To Delete ${row.original?.name}`,
                            header: "Delete Model",
                          });
                          setDeleteModal(true);
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
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
