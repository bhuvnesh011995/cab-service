import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
  TableRowsTwoTone,
} from "@mui/icons-material/";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import AddState from "../StateManagement/AddState";
import UpdateState from "../StateManagement/UpdateState";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateStatus,
  fetchStates,
  filterStates,
  getStates,
  stateError,
  stateStatus,
} from "../../../Redux/features/stateReducer";
const initialFilter = {
  name: "",
  country: "",
  status: "",
};

export default function StateManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const url = BASE_URL + "/states/filter/";
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [updateData, setUpdateData] = useState([]);
  const status = useSelector(stateStatus);
  const dispatch = useDispatch();
  const error = useSelector(stateError);
  const [ready, setReady] = useState(false);
  const states = useSelector(getStates);
  useEffect(() => {
    if (ready) {
      dispatch(filterStates(filter));
    } else setReady(true);

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data?.stateList?.map((ele, i) => {
          arr.push({
            index: i + 1,
            id: ele._id,
            name: ele.name,
            stateCode: ele.stateCode,
            country: ele.country?.id,
            countries: ele.country?.name,
            status: ele.status,
            createdAt: ele.createdAt || "",
          });
        });
        setList(arr);
      });
  }, [ready]);

  useEffect(() => {
    if (status === "updated") {
      toast.success("state updated successfully");
      dispatch(clearStateStatus());
    } else if (status === "added") {
      toast.success("state added successfully");
      dispatch(clearStateStatus());
    } else if (status === "deleted") {
      toast.success("state deleted successfully");
      dispatch(clearStateStatus());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearStateStatus());
    }
  }, [status, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "stateCode",
        header: "State Code",
        size: 100,
      },
      {
        accessorFn: (row) => (row.country ? row.country.name : "NA"),
        id: "country",
        header: "Country",
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

  function handleUpdate(data) {
    setUpdateData(data);
    setIsTrue(true);
  }

  function handleSubmit() {
    dispatch(filterStates(filter));
    fetch(
      `${url}?name=${filter.name}&country=${filter.country}&status=${filter.status}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data?.stateList?.map((ele, i) => {
          arr.push({
            index: i + 1,
            name: ele.name,
            stateCode: ele.stateCode,
            country: ele.country,
            status: ele.status,
            createdAt: ele.createdAt || "",
          });
        });
        setList(arr);
      });
  }

  function handleDelete(rowId) {
    const deleteUrl = BASE_URL + "/state/" + rowId;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const filterList = list.filter((item) => item.id !== rowId);
          setList(filterList);
          setIsOpen(false);
          return response.json();
        }
      })
      .then((data) => {
        if (data.success) toast.success(data.message);
        else toast.success(data.message);
      })
      .catch((error) => {
        console.error("Error occurred while deleting:", error);
      });
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"STATE MANAGEMENT"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={handleDelete}
              arg={id}
            />
            {isTrue && (
              <UpdateState
                show={isTrue}
                setShow={setIsTrue}
                data={updateData}
              />
            )}
            {open && <AddState show={open} setShow={setOpen} />}
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
                    setOpen(true);
                  }}
                  title={"Add State"}
                />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"reset"}
                options={["name", "status", "country"]}
              />
            </div>
          </div>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={states}
        enableRowNumbers
        rowNumberMode="static"
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
            <IconButton>
              <RemoveRedEye />
            </IconButton>
            <IconButton>
              <Lock />
            </IconButton>
            <IconButton
              onClick={() => {
                handleUpdate(row.original);
              }}
            >
              <ModeEditOutline />
            </IconButton>
            <IconButton>
              <DeleteForever
                onClick={() => {
                  setDeleteInfo({
                    message: `Do You Really Want To Delete ${row.original?.name}`,
                    header: "Delete Model",
                  });
                  setIsOpen(true);
                  setId(row.original.id);
                }}
              />
            </IconButton>
          </Box>
        )}
      />
    </Management_container>
  );
}
