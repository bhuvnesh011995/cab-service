import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import BASE_URL from "../../../config/config";
import AddPromotion from "./AddPromotion";
import {
  cleanPromotionStatus,
  deletePromotion,
  fetchPromotion,
  filterPromotion,
  getAllPromotion,
  getViewPromotion,
  status,
  updatePromotionById,
} from "../../../Redux/features/promotionReducer";
import {
  doneDelete,
  openModal,
  showDeleteModal,
  status as deleteModalStatus,
  closeModal,
  url,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import ViewPromotion from "./ViewPromotion";
import { useForm } from "react-hook-form";
import moment from "moment";

export default function PromotionManagement() {
  const isOpen = useSelector(showDeleteModal);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [openView, setOpenView] = useState(false);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const { register, watch, handleSubmit, reset } = useForm();
  const URL = useSelector(url);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPromotion());
  }, []);

  const promotion = useSelector(getAllPromotion);
  const promotionStatus = useSelector(status);

  useEffect(() => {
    if (promotionStatus === "added") {
      toast.success("promotion added successfully");
      setShow(false);
      dispatch(cleanPromotionStatus());
    } else if (promotionStatus === "update") {
      toast.success("promotion update successfully");
      setShow(false);
      dispatch(cleanPromotionStatus());
    } else if (promotionStatus === "deleted") {
      toast.success("promotion delete successfully");
      dispatch(closeModal());
      dispatch(cleanPromotionStatus());
    }
  }, [promotionStatus]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.country?.name,
        header: "country",
        size: 100,
      },
      {
        accessorFn: (row) => row.state?.name,
        header: "state",
        size: 100,
      },
      {
        accessorFn: (row) => row.city?.name,
        header: "city",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Title",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
      {
        accessorFn: (row) => moment(row.createdAt)?.format("ll"),
        id: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deletePromotion({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  function onSubmit(data) {
    dispatch(filterPromotion(data));
  }

  function handleReset() {
    reset();
  }

  return (
    <Management_container title={"Promotion Management"}>
      {isOpen && <DeleteModalAdv />}
      {show && <AddPromotion show={show} setShow={setShow} />}
      {openView && <ViewPromotion show={openView} setShow={setOpenView} />}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 text-right">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShow(true)}
                  >
                    Add New
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className="justify-content-center row align-items-end mb-5"
                    style={{ alignItems: "end" }}
                  >
                    <div className="col-md-3">
                      {" "}
                      <label className="form-label">Title</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("name")}
                      />
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <label className="form-label">country</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("country")}
                      />
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <label className="form-label">state</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("state")}
                      />
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <label className="form-label">City</label>
                      <input
                        className="form-control"
                        placeholder="Enter Title"
                        {...register("city")}
                      />
                    </div>

                    <div className="col-md-3">
                      <button type="submit" className="btn  btn-primary ">
                        Search
                      </button>
                      <button
                        className="btn btn-danger me-3"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                  </div>{" "}
                </form>
              </div>

              <MaterialReactTable
                columns={columns}
                data={promotion || []}
                enableRowActions
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnActions={false}
                enableRowNumbers
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
                        dispatch(getViewPromotion({ id: row.original._id }));
                        setOpenView(true);
                      }}
                      className="btn btn-icon btn-sm btn-warning rounded-pill"
                    >
                      <i className="mdi mdi-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(updatePromotionById({ id: row.original._id }));
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
                            url: `${BASE_URL}/promotion/${row.original._id}`,
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
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
