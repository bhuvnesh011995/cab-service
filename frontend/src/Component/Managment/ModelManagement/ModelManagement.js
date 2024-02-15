import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import AddModel from "./AddModel";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchModel,
  getAllModel,
  deleteModels,
  updateModelById,
  cleanModelStatus,
  filterModel,
  getViewModel,
} from "../../../Redux/features/ModelReducer";
import {
  openModal,
  showDeleteModal,
  url,
  status as deleteModalStatus,
  closeModal,
  doneDelete,
} from "../../../Redux/features/deleteModalReducer";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import ViewModel from "./ViewModel";
import { useForm } from "react-hook-form";

export default function ModelManagement() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [openView, setOpenView] = useState(false);

  const showDelete = useSelector(showDeleteModal);
  const id = useSelector((state) => state.delete.id);
  const deleteStatus = useSelector(deleteModalStatus);
  const modelData = useSelector(getAllModel);
  const modelstatus = useSelector((state) => state.model.status);
  const error = useSelector((state) => state.model.error);
  const URL = useSelector(url);
  const dispatch = useDispatch();

  const { register, reset, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchModel());
  }, []);

  useEffect(() => {
    if (modelstatus === "idle") dispatch(fetchModel());
    else if (modelstatus === "added") {
      toast.success("admin added successfully");
      setShow(false);
      dispatch(cleanModelStatus());
    } else if (modelstatus === "updated") {
      toast.success("model updated succeefully");
      dispatch(cleanModelStatus());
      setShow(false);
    } else if (modelstatus === "deleted") {
      toast.success("admin deleted successfully");
      dispatch(cleanModelStatus());
      dispatch(closeModal());
    }
  }, [modelstatus, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "manufacturer.name",
        header: "Manufacturer",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Model",
        size: 100,
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

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteModels({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  function onSubmit(data) {
    dispatch(filterModel(data));
  }

  function handleReset() {
    reset();
  }

  return (
    <Management_container title={"Model Management"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            {show && <AddModel show={show} setShow={setShow} />}
            {showDelete && <DeleteModalAdv />}
            {openView && <ViewModel show={openView} setShow={setOpenView} />}

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
                      <label class="form-label">Manufacturer</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("manufacturer")}
                      />
                    </div>
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
        heading={["Sr no", "Make", "Model", "Status", "Created At", "Action"]}
        list={list}
      /> */}
              <MaterialReactTable
                columns={columns}
                data={modelData || []}
                enableRowNumbers={true}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnActions={false}
                rowNumberDisplayMode="static"
                enableRowActions
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
                positionActionsColumn={"last"}
                renderRowActions={({ row, table }) => (
                  <div className="hstack gap-2 fs-1">
                    <button
                      onClick={() => {
                        dispatch(getViewModel({ id: row.original._id }));
                        setOpenView(true);
                      }}
                      className="btn btn-icon btn-sm btn-warning rounded-pill"
                    >
                      <i className="mdi mdi-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(updateModelById({ id: row.original._id }));
                        setShow(true);
                      }}
                      className="btn btn-icon btn-sm btn-info rounded-pill"
                    >
                      <i className="bx bxs-edit-alt" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/model/${row.original._id}`,
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
          </div>{" "}
        </div>{" "}
      </div>
    </Management_container>
  );
}
