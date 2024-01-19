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
  error,
  fetchPromotion,
  getAllPromotion,
  status,
  updatePromotionById,
} from "../../../Redux/features/promotionReducer";

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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [show, setShow] = useState(false);
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
  const promotionError = useSelector(error);
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
    []
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
      { method: "GET" }
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

  const deleteModel = (rowId) => {
    const deleteUrl = BASE_URL + "/promotion/" + rowId;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const filterModel = list.filter((data) => data.id !== rowId);
          setList(filterModel);
          setIsOpen(false);
          return response.json();
        }
      })
      .then((item) => {
        if (item.success) toast.success(item.message);
        else toast.error.apply(item.message);
      })
      .catch((error) => {
        console.error("Error occurred while deleting admin:", error);
      });
  };

  function reset() {}
  return (
    <Management_container title={"Promotion Management"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={deleteModel}
              arg={id}
            />
            {show && <AddPromotion show={show} setShow={setShow} />}
            <div class="card-body">
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
              <form style={{ margin: "50px" }}>
                <div className="row">
                  <div className="col-lg-2 inputField">
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
                  <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
                    <IconButton>
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(updatePromotionById({ id: row.original._id }));
                        setShow(true);
                      }}
                    >
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteInfo({
                          message: `Do You Really Want To Delete ${row.original?.id}`,
                          header: "Delete Model",
                        });
                        setIsOpen(true);
                        setId(row.original._id);
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
