import { useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Management_container from "../../Common/Management_container";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddReferral from "./AddReferral";
import {
  cleanReferralStatus,
  deleteReferral,
  fetchReferral,
  getAllReferral,
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
export default function ReferralManagement() {
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const [isOpen, setIsOpen] = useState(false);
  const open = useSelector(showDeleteModal);

  const dispatch = useDispatch();
  const referral = useSelector(getAllReferral);
  useEffect(() => {
    dispatch(fetchReferral());
  }, []);

  const referralStatus = useSelector(status);
  useEffect(() => {
    if (referralStatus === "added") {
      toast.success("referral added successfully");
      setIsOpen(false);
      dispatch(cleanReferralStatus());
    } else if (referralStatus === "update") {
      toast.success("referral update successfully");
      setIsOpen(false);
      dispatch(cleanReferralStatus());
    } else if (referralStatus === "deleted") {
      toast.success("referral delete successfully");
      dispatch(closeModal());
      dispatch(cleanReferralStatus());
    }
  }, [referralStatus]);

  const columns = useMemo(
    () => [{ accessorKey: "status", header: "status" }],
    []
  );

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteReferral({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);
  return (
    <Management_container title={"Referral Management "}>
      {isOpen && <AddReferral show={isOpen} setShow={setIsOpen} />}
      {open && <DeleteModalAdv />}
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
                data={referral || []}
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
                  <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
                    <IconButton>
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(updateReferralById({ id: row.original._id }));
                        setIsOpen(true);
                      }}
                    >
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/referral/${row.original._id}`,
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
