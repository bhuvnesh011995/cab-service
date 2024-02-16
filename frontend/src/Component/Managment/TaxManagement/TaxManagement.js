import { useEffect, useMemo, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTaxStatus,
  deleteTax,
  filterTax,
  getTaxes,
  getViewTaxes,
  taxError,
  taxStatus,
  taxToUpdate,
} from "../../../Redux/features/taxReducer";
import moment from "moment";
import { AddNew } from "./AddTax";
import { toast } from "react-toastify";
import {
  showDeleteModal,
  url,
  status as deleteModalStatus,
  closeModal,
  doneDelete,
  openModal,
} from "../../../Redux/features/deleteModalReducer";
import BASE_URL from "../../../config/config";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import ViewTaxManagement from "./ViewTaxManagement";
import { useForm } from "react-hook-form";
const initialTax = {
  title: "",
  value: 0,
  status: "",
  taxType: "",
};

export default function TaxManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [tax, setTax] = useState(initialTax);
  const dispatch = useDispatch();
  const taxes = useSelector(getTaxes);
  const status = useSelector(taxStatus);
  const error = useSelector(taxError);
  const [ready, setReady] = useState(false);
  const [openView, setOpenView] = useState(false);
  const show = useSelector(showDeleteModal);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteTax({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);
  useEffect(() => {
    if (ready) dispatch(filterTax({}));
    else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "added") {
      toast.success("tax added successfully");
      dispatch(clearTaxStatus());
      setIsOpen(false);
    } else if (status === "updated") {
      toast.success("tax updated successfully");
      setIsOpen(false);
      dispatch(clearTaxStatus());
    } else if (status === "deleted") {
      toast.success("tax deleted successfully");
      dispatch(clearTaxStatus());
      dispatch(closeModal());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearTaxStatus());
    }
  }, [status, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },

      {
        accessorKey: "taxType",
        header: "Tax Type",
        enableColumnActions: false,
        enableColumnFilter: false,
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },

      {
        accessorKey: "value",
        enableColumnFilter: false,
        header: "Value(%)",
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorKey: "status",
        enableColumnFilter: false,
        header: "status",
        enableColumnActions: false,
        size: 80,
        muiTableHeadCellProps: {
          align: "center",
        },
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        enableColumnFilter: false,
        enableColumnActions: false,
        header: "Created At",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
    ],
    []
  );

  function onSubmit(data) {
    dispatch(filterTax(data));
  }

  function handleReset() {
    reset();
  }

  return (
    <Management_container title={"Tax Management"}>
      {show && <DeleteModalAdv />}
      {isOpen && <AddNew show={isOpen} setShow={setIsOpen} />}
      {openView && <ViewTaxManagement show={openView} setShow={setOpenView} />}

      <div class="row">
        <div class="col-lg-13">
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
                        {...register("title")}
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
              <MaterialReactTable
                columns={columns}
                data={taxes}
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
                      onClick={() => {
                        dispatch(getViewTaxes({ id: row.original._id }));
                        setOpenView(true);
                      }}
                      className="btn btn-icon btn-sm btn-warning rounded-pill"
                    >
                      <i className="mdi mdi-eye"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(taxToUpdate({ id: row.original._id }));
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
                            url: `${BASE_URL}/tax/${row.original._id}`,
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
