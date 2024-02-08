import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useEffect, useMemo, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import AddPromoCode from "./AddPromoCode";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import BASE_URL from "../../../config/config";
import {
  cleanPromotionStatus,
  getViewPromotion,
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
import {
  cleanPromoCodeStatus,
  deletePromoCode,
  fetchPromoCode,
  getAllPromoCode,
  getViewPromoCode,
  statusPromoCode,
  updatePromoCodeById,
} from "../../../Redux/features/promoCodeReducer";
import ViewPromoCode from "./ViewPromoCode";

export default function PromoCodeManagement() {
  const isOpen = useSelector(showDeleteModal);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPromoCode());
  }, []);
  const promoCode = useSelector(getAllPromoCode);
  const promoCodeStatus = useSelector(statusPromoCode);
  useEffect(() => {
    if (promoCodeStatus === "added") {
      toast.success("promotion added successfully");
      setShow(false);
      dispatch(cleanPromotionStatus());
    } else if (promoCodeStatus === "update") {
      toast.success("promoCode update successfully");
      setShow(false);
      dispatch(cleanPromoCodeStatus());
    } else if (promoCodeStatus === "deleted") {
      toast.success("promoCode delete successfully");
      dispatch(closeModal());
      dispatch(cleanPromoCodeStatus());
    }
  }, [promoCodeStatus]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "promoCode",
        header: "code",
        size: 80,
      },
      {
        accessorFn: (row) => row.state?.name,
        id: "state",
        header: "State",
        size: 100,
      },
      {
        accessorFn: (row) => row.country?.name,
        id: "country",
        header: "Country",
      },
      {
        accessorFn: (row) => row.city?.name,
        id: "city",
        header: "city",
      },

      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        header: "Created At",
      },
      {
        accessorFn: (row) => row.validFrom.slice(0, 10),
        id: "validFrom",
        header: "validFrom",
      },
    ],
    []
  );

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deletePromoCode({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  return (
    <Management_container title={"PromoCode Management"}>
      {isOpen && <DeleteModalAdv />}
      {show && <AddPromoCode show={show} setShow={setShow} />}
      {openView && <ViewPromoCode show={openView} setShow={setOpenView} /> }
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-right">
                  <button class="btn btn-primary" onClick={() => setShow(true)}>
                    Add New
                  </button>
                </div>
                <div
                  class="justify-content-center row align-items-end mb-5"
                  style={{ alignItems: "end" }}
                >
                  <div class="col-md-3">
                    {" "}
                    <label class="form-label">Title</label>
                    <input className="form-control" placeholder="Enter Title" />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Status</label>
                    <select class="form-control">
                      <option>Choose...</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>

                  <div class="col-md-3">
                    <button class="btn btn-primary me-3">Search</button>
                    <button class="btn btn-danger me-3">Reset</button>
                  </div>
                </div>{" "}
              </div>

              <MaterialReactTable
                columns={columns}
                data={promoCode || []}
                enableRowActions
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
                  <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
                    <IconButton
                      onClick={() => {
                        dispatch(getViewPromoCode({ id: row.original._id }));
                        setOpenView(true);
                      }}
                    >
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(updatePromoCodeById({ id: row.original._id }));
                        setShow(true);
                      }}
                    >
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/promoCode/${row.original._id}`,
                            id: row.original._id,
                          })
                        );
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  </Box>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
