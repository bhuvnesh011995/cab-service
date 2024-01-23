import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import AddModel from "./AddModel";
import DeleteModal from "../../DeleteModel/DeleteModel";
import ModelUpdate from "../ModelManagement/ModelUpdate";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchModel,
  getAllModel,
  deleteModels,
  updateModelById,
  cleanModlStatus,
  filterModel,
} from "../../../Redux/features/ModelReducer";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
let initialFilter = {
  manufacturer: "",
  name: "",
  status: "",
};

export default function ModelManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModel());
  }, []);

  const modelData = useSelector(getAllModel);
  const modelstatus = useSelector((state) => state.model.status);
  const message = useSelector((state) => state.model.message);

  useEffect(() => {
    if (modelstatus === "deleted") {
      setIsOpen(false);
      toast.success(message);
      dispatch(cleanModlStatus());
    } else if (modelstatus === "added") {
      setShow(false);
      toast.success("added succesfully");
    } else if (modelstatus === "update") {
      setShow(false);
      toast.success("updated");
      dispatch(cleanModlStatus());
    }
  }, [modelstatus]);

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
      // {
      //   accessorFn: (row) => moment(row?.createdAt)?.format("ll"),
      //   id: "createdAt",
      //   header: "Created At",
      // },
    ],
    []
  );

  useEffect(() => {
    dispatch(filterModel(filter));
  }, []);

  function handleSubmit() {
    dispatch(filterModel(filter));
  }

  const deleteModel = (id) => {
    dispatch(deleteModels(id));
  };

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"Model Management"}>
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
            {show && <AddModel show={show} setShow={setShow} />}
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
            <IconButton>
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
                setDeleteInfo({
                  message: `Do You Really Want To Delete ${row.original?.name}`,
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
    </Management_container>
  );
}
