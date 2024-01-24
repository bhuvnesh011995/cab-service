import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import AddModel from "./AddModel";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchModel,
  getAllModel,
  deleteModels,
  updateModelById,
  cleanModelStatus,
  filterModel,
  getViewModel,
} from "../../../Redux/features/ModelReducer";
import {
  openModal,
  showDeleteModal,
  url,
  status as deleteModalStatus,
  closeModal,
  doneDelete,
} from "../../../Redux/features/deleteModalReducer";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
import ViewModel from "./ViewModel";
let initialFilter = {
  manufacturer: "",
  name: "",
  status: "",
};

export default function ModelManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [openView, setOpenView] = useState(false);

  const showDelete = useSelector(showDeleteModal);
  const id = useSelector((state) => state.delete.id);
  const deleteStatus = useSelector(deleteModalStatus);
  const modelData = useSelector(getAllModel);
  const modelstatus = useSelector((state) => state.model.status);
  const error = useSelector((state) => state.model.error);
  const URL = useSelector(url);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModel());
  }, []);

  useEffect(() => {
    if (modelstatus === "idle") dispatch(fetchModel());
    else if (modelstatus === "added") {
      toast.success("admin added successfully");
      setShow(false);
      dispatch(cleanModelStatus());
    } else if (modelstatus === "updated") {
      toast.success("model updated succeefully");
      dispatch(cleanModelStatus());
      setShow(false);
    } else if (modelstatus === "deleted") {
      toast.success("admin deleted successfully");
      dispatch(cleanModelStatus());
      dispatch(closeModal());
    }
  }, [modelstatus, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "manufacturer.name",
        header: "Manufacturer",
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
        accessorFn: (row) => moment(row?.createdAt)?.format("ll"),
        id: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteModels({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  useEffect(() => {
    dispatch(filterModel(filter));
  }, []);

  function handleSubmit() {
    dispatch(filterModel(filter));
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"Model Management"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            {show && <AddModel show={show} setShow={setShow} />}
            {showDelete && <DeleteModalAdv />}
            {openView && <ViewModel show={openView} setShow={setOpenView} />}

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
                  title={"Add Model"}
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
                options={["name", "status", "manufacturer"]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Table
        heading={["Sr no", "Make", "Model", "Status", "Created At", "Action"]}
        list={list}
      /> */}
      <MaterialReactTable
        columns={columns}
        data={modelData || []}
        enableRowNumbers={true}
        rowNumberDisplayMode="static"
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
            <IconButton
              onClick={() => {
                dispatch(getViewModel({ id: row.original._id }));
                setOpenView(true);
              }}
            >
              <RemoveRedEye />
            </IconButton>
            <IconButton>
              <Lock />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(updateModelById({ id: row.original._id }));
                setShow(true);
              }}
            >
              <ModeEditOutline />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  openModal({
                    url: `${BASE_URL}/model/${row.original._id}`,
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
    </Management_container>
  );
}
