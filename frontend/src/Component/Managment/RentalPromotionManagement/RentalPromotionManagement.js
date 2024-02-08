import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useEffect, useMemo, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import AddRentalPromotion from "./AddRentalPromotion";
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
  cleanRentalPromotionStatus,
  deleteRentalPromotion,
  fetchRentalPromotion,
  getAllRentalPromotion,
  status,
  updateRentalPromotionById,
} from "../../../Redux/features/rentalPromotionReducer";

export default function RentalPromotionManagement() {
  const isOpen = useSelector(showDeleteModal);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRentalPromotion());
  }, []);
  const rentalPromotion = useSelector(getAllRentalPromotion);
  const rentalPromotionStatus = useSelector(status);
  useEffect(() => {
    if (rentalPromotionStatus === "added") {
      toast.success("rentalPromotion added successfully");
      setShow(false);
      dispatch(cleanRentalPromotionStatus());
    } else if (rentalPromotionStatus === "update") {
      toast.success("rentalPromotion update successfully");
      setShow(false);
      dispatch(cleanRentalPromotionStatus());
    } else if (rentalPromotionStatus === "deleted") {
      toast.success("rentalPromotion delete successfully");
      dispatch(closeModal());
      dispatch(cleanRentalPromotionStatus());
    }
  }, [rentalPromotionStatus]);

  console.log("rentalPromotionStatus", rentalPromotionStatus);

  const columns = useMemo(
    () => [
      {
        accessorKey: "promoCode",
        header: "code",
        size: 80,
      },
      {
        accessorFn: (row) => row.package?.name,
        id: "package",
        header: "package",
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
    [],
  );

<<<<<<< HEAD
=======
  function handleSubmit() {
    fetch(
      BASE_URL +
        "/promotion/self/filter/?title=" +
        filter.title +
        "&status=" +
        filter.status +
        "&forUsers=" +
        filter.forUsers,
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = data.promotions.map((ele) => {
            let obj = {};
            obj.title = ele.title;
            obj.country = ele.country?.name;
            obj.state = ele.state?.name;
            obj.city = ele.city?.name;
            obj.forUsers = ele.forUsers.join();
            obj.status = ele.status;
            obj.description = ele.description;
            obj.createdAt = ele.createdAt;
            obj.updatedAt = ele.updatedAt;
            return obj;
          });
          setList(arr);
        }
      });
  }

>>>>>>> 7eac9678185526962a904fe6dbf12e91b13ff24a
  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteRentalPromotion({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  return (
    <Management_container title={"Rental Promotion Management"}>
<<<<<<< HEAD
      {isOpen && <DeleteModalAdv />}
      {show && <AddRentalPromotion show={show} setShow={setShow} />}
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 text-right">
                  <button class="btn btn-primary" onClick={() => setShow(true)}>
                    {" "}
                    Add New{" "}
                  </button>
                </div>
                <div
                  class="justify-content-center row align-items-end mb-5"
                  style={{ alignItem: "center" }}
                >
                  <div class="col-md-3">
                    <label class="form-label">Title</label>
                    <input className="form-control" placeholder="Enter Title" />
                  </div>{" "}
                  <div class="col-md-3">
                    <label class="form-label">status</label>
                    <select class="form-control">
                      <option>choose...</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-primary me-3">Search</button>
                    <button class="btn btn-danger me-3">Reset</button>
=======
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            {isOpen && <DeleteModalAdv />}
            {show && <AddRentalPromotion show={show} setShow={setShow} />}

            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => {
                    setShow(true);
                  }}
                  title={"Add Promotion"}
                />
              </div>
              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      lebel_text={"Title :"}
                      setKey={"title"}
                      setInput={setFilter}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status : "}
                      setKey={"status"}
                    />
                    <Selection_Input
                      options={["ADMIN", "DRIVER", "RIDER"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"User Type : "}
                      setKey={"forUsers"}
                    />

                    <div>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />
                      <BtnDark handleClick={reset} title={"reset"} />
                    </div>
>>>>>>> 7eac9678185526962a904fe6dbf12e91b13ff24a
                  </div>
                </div>
              </div>

              <MaterialReactTable
                columns={columns}
                data={rentalPromotion || []}
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
                  <div className='hstack gap-2 fs-1'>
                    <button
                      onClick={() => {
                        dispatch(getViewPromotion({ id: row.original._id }));
                        setOpenView(true);
                      }}
                      className='btn btn-icon btn-sm btn-warning rounded-pill'
                    >
                      <i className='mdi mdi-eye'></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          updateRentalPromotionById({ id: row.original._id }),
                        );
                        setShow(true);
                      }}
                      className='btn btn-icon btn-sm btn-info rounded-pill'
                    >
                      <i className='bx bxs-edit-alt' />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/rentalPromotion/${row.original._id}`,
                            id: row.original._id,
                          }),
                        );
                      }}
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
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}