import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useEffect, useMemo, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import BASE_URL from "../../../config/config";
import AddPromotion from "./AddPromotion";
import {
  cleanPromotionStatus,
  deletePromotion,
  error,
  fetchPromotion,
  getAllPromotion,
  getAllViewPromotion,
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

const initialFilter = {
  title: "",
  forUsers: "",
  countryId: "",
  stateId: "",
  cityId: "",
  status: "",
};
export default function PromotionManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState([]);
  const isOpen = useSelector(showDeleteModal);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(BASE_URL + "/promotion/self/filter", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = data.promotions.map((ele) => {
            let obj = {};
            obj.id = ele._id;
            obj.title = ele.title;
            obj.country = ele.country?.name;
            obj.state = ele.state?.name;
            obj.city = ele.city?.name;
            // obj.forUsers = ele?.forUsers.join();
            obj.status = ele?.status;
            obj.description = ele?.description;
            obj.createdAt = ele?.createdAt;
            obj.updatedAt = ele?.updatedAt;
            return obj;
          });

          setList(arr);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(fetchPromotion());
  }, []);
  const promotion = useSelector(getAllPromotion);
  const promotionStatus = useSelector(status);
  console.log("promotionStatus", promotionStatus);
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
        accessorKey: "name",
        header: "title",
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
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        header: "Created At",
      },
    ],
    [],
  );

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

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deletePromotion({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  function reset() {}
  return (
    <Management_container title={"Promotion Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            {isOpen && <DeleteModalAdv />}
            {show && <AddPromotion show={show} setShow={setShow} />}
            {openView && (
              <ViewPromotion show={openView} setShow={setOpenView} />
            )}

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
                  </div>
                </div>
              </form>

              <MaterialReactTable
                columns={columns}
                data={promotion || []}
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
                        dispatch(updatePromotionById({ id: row.original._id }));
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
                            url: `${BASE_URL}/promotion/${row.original._id}`,
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
