import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { toast } from "react-toastify";
import AddState from "../StateManagement/AddState";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStateStatus,
  deleteState,
  fetchStates,
  filterStates,
  getStates,
  stateError,
  stateForUpdate,
  stateStatus,
} from "../../../Redux/features/stateReducer";
import {
  openModal,
  url,
  status as deleteModalStatus,
  doneDelete,
  showDeleteModal,
  closeModal,
} from "../../../Redux/features/deleteModalReducer";
import BASE_URL from "../../../config/config";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
const initialFilter = {
  name: "",
  country: "",
  status: "",
};

export default function StateManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [open, setOpen] = useState(false);
  const status = useSelector(stateStatus);
  const dispatch = useDispatch();
  const error = useSelector(stateError);
  const [ready, setReady] = useState(false);
  const states = useSelector(getStates);
  const show = useSelector(showDeleteModal);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);

  useEffect(() => {
    if (ready) {
      dispatch(filterStates(filter));
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "updated") {
      toast.success("state updated successfully");
      setOpen(false);
      dispatch(clearStateStatus());
    } else if (status === "added") {
      toast.success("state added successfully");
      setOpen(false);
      dispatch(clearStateStatus());
    } else if (status === "deleted") {
      toast.success("state deleted successfully");
      dispatch(closeModal());
      dispatch(clearStateStatus());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearStateStatus());
    }
  }, [status, error]);

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteState({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

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

  function handleSubmit() {
    dispatch(filterStates(filter));
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"STATE MANAGEMENT"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            {show && <DeleteModalAdv />}

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
                dispatch(stateForUpdate({ id: row.original._id }));
                setOpen(true);
              }}
            >
              <ModeEditOutline />
            </IconButton>
            <IconButton>
              <DeleteForever
                onClick={() => {
                  dispatch(
                    openModal({
                      url: `${BASE_URL}/state/${row.original._id}`,
                      id: row.original._id,
                    })
                  );
                }}
              />
            </IconButton>
          </Box>
        )}
      />
    </Management_container>
  );
}
