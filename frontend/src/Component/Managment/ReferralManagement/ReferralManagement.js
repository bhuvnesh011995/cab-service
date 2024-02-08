import { useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Management_container from "../../Common/Management_container";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
<<<<<<< HEAD
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
=======
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";

const initialFilter = {
  title: "",
  status: "",
};
export default function ReferralManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL + "/referral/filter/", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = data.referrals.map((ele) => {
            let obj = {};
            obj.title = ele.title;
            obj.forUsers = ele.forUsers.join();
            obj.status = ele.status;
            obj.freeRideToReferrer = ele.freeRideToReferrer ? (
              <tiIcons.TiTick />
            ) : (
              <rsIcons.RxCross2 />
            );
            obj.freeRideToApplier = ele.freeRideToApplier ? (
              <tiIcons.TiTick />
            ) : (
              <rsIcons.RxCross2 />
            );
            obj.maxFreeRideToReferrer = ele.maxFreeRideToReferrer;
            obj.amountToReferrer = ele.amountToReferrer.$numberDecimal;
            obj.maxAmountToReferrer = ele.maxAmountToReferrer.$numberDecimal;
            obj.amountToApplier = ele.amountToApplier.$numberDecimal;
            obj.createdAt = ele.createdAt;
            obj.updatedAt = ele.updatedAt;

            return obj;
          });

          setList(arr);
        }
      });
  }, []);

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
        accessorKey: "forUsers",
        header: "User Type",
        enableColumnActions: false,
        enableColumnFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
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
        accessorKey: "freeRideToReferrer",
        enableColumnFilter: false,
        header: "Free Ride To Referrer",
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
        accessorKey: "maxFreeRideToReferrer",
        header: "Max Free Ride To Referrer",
        enableColumnFilter: false,
        enableColumnActions: false,
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
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "amountToReferrer",
        header: "Amount To Referrer",
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 80,
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
        accessorKey: "maxAmountToReferrer",
        header: "Max Amount To Referrer",
        enableColumnFilter: false,
        enableColumnActions: false,
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
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "freeRideToApplier",
        enableColumnFilter: false,
        enableColumnActions: false,
        header: "Free Ride To Applier",
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
        accessorKey: "amountToApplier",
        header: "Amount To Applier",
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 40,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
    ],
    [],
  );

  function handleClick() {
    navigate("/addReferral");
  }

  function handleSubmit() {
    fetch(
      BASE_URL +
        "/referral/filter/?title=" +
        filter.title +
        "&status=" +
        filter.status,
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = data.referrals.map((ele) => {
            let obj = {};
            obj.title = ele.title;
            obj.forUsers = ele.forUsers.join();
            obj.status = ele.status;
            obj.freeRideToReferrer = ele.freeRideToReferrer ? (
              <tiIcons.TiTick />
            ) : (
              <rsIcons.RxCross2 />
            );
            obj.freeRideToApplier = ele.freeRideToApplier ? (
              <tiIcons.TiTick />
            ) : (
              <rsIcons.RxCross2 />
            );
            obj.maxFreeRideToReferrer = ele.maxFreeRideToReferrer;
            obj.amountToReferrer = ele.amountToReferrer.$numberDecimal;
            obj.maxAmountToReferrer = ele.maxAmountToReferrer.$numberDecimal;
            obj.amountToApplier = ele.amountToApplier.$numberDecimal;
            obj.createdAt = ele.createdAt;
            obj.updatedAt = ele.updatedAt;

            return obj;
          });

          setList(arr);
        }
      });
  }
  function reset() {}
  return (
    <Management_container title={"Referral Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"Add Referral"} />
              </div>
              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Title"}
                      setKey={"title"}
                    />
                    <Selection_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"status"}
                      lebel_text={"Stateus :"}
                      options={["ACTIVE", "INACTIVE"]}
                    />

                    <div>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />
                      <BtnDark handleClick={reset} title={"reset"} />
                    </div>
                  </div>
                </div>
              </form>
              <MaterialReactTable
                columns={columns}
                data={list || []}
>>>>>>> 7eac9678185526962a904fe6dbf12e91b13ff24a
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
<<<<<<< HEAD
=======
                    // enableColumnOrdering: true, //turn on some features that are usually off
>>>>>>> 7eac9678185526962a904fe6dbf12e91b13ff24a
                    muiTableHeadCellProps: {
                      sx: {
                        fontSize: "1.2rem",
                      },
                    },
                  },
                }}
                positionActionsColumn={"last"}
                renderRowActions={({ row, table }) => (
<<<<<<< HEAD
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
=======
                  <div className='hstack gap-2 fs-1'>
                    <button
                      onClick={() => {}}
                      className='btn btn-icon btn-sm btn-warning rounded-pill'
                    >
                      <i className='mdi mdi-eye'></i>
                    </button>
                    <button
                      onClick={() => {}}
                      className='btn btn-icon btn-sm btn-info rounded-pill'
                    >
                      <i className='bx bxs-edit-alt' />
                    </button>
                    <button
                      onClick={() => {}}
                      className='btn btn-icon btn-sm btn-danger rounded-pill'
                    >
                      <i className='bx bxs-trash' />
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
>>>>>>> 7eac9678185526962a904fe6dbf12e91b13ff24a
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
