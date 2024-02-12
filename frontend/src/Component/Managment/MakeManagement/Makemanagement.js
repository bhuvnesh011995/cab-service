import { useEffect, useMemo, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import ViewManufacturer from "./viewManufacturer";
import AddManufacturer from "./AddManufacturer";
import {
  selectManufacturer,
  fetchManufacturer,
  deleteManufacturer,
  updatetManufacturerById,
  status,
  cleanManufaturerStatus,
  filterManufacturer,
  viewManufacturer,
} from "../../../Redux/features/ManufacturerReducer";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { getPermissions } from "../../../Redux/features/authReducer";
import { toast } from "react-toastify";
let initialFilter = {
  name: "",
  status: "",
};

export default function MakeManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const url = BASE_URL + "/make/filter/";
  const permissions = useSelector(getPermissions);
  const [viewModel, setViewModel] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchManufacturer());
  }, []);

  const manufacturerData = useSelector(selectManufacturer);

  const manufacturerStatus = useSelector(status);
  const message = useSelector((state) => state.manufacturer.message);

  useEffect(() => {
    if (manufacturerStatus === "deleted") {
      setDeleteModal(false);
      toast.success(message);
      dispatch(cleanManufaturerStatus());
    } else if (manufacturerStatus === "added") {
      setIsOpen(false);
      toast.success("added successfully");
    } else if (manufacturerStatus === "updated") {
      setIsOpen(false);
      toast.success("updated");
      dispatch(cleanManufaturerStatus());
    }
  }, [manufacturerStatus]);

  const handleDeleteClick = (manufacturerId) => {
    dispatch(deleteManufacturer(manufacturerId));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
      },
    ],
    []
  );
  useEffect(() => {
    dispatch(filterManufacturer(filter));
  }, []);

  function handleSubmit() {
    dispatch(filterManufacturer(filter));
  }
  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"Manufacture"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={deleteModal}
              setShow={setDeleteModal}
              handleDelete={handleDeleteClick}
              arg={id}
            />
            {isOpen && <AddManufacturer show={isOpen} setShow={setIsOpen} />}
            {viewModel && (
              <ViewManufacturer show={viewModel} setShow={setViewModel} />
            )}

            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                {(permissions.includes("All") ||
                  permissions.includes("addMake")) && (
                  <BtnDark
                    handleClick={() => {
                      setIsOpen(true);
                    }}
                    title={"Add Manufacture"}
                  />
                )}
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"Reset"}
                options={["name", "status"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <Table
        heading={["Sr no", "Name", "Status", "Created At", "Action"]}
        list={list}
      /> */}
      {(permissions.includes("All") || permissions.includes("viewTable")) && (
        <MaterialReactTable
          columns={columns || []}
          data={manufacturerData || []}
          enableRowNumbers={true}
          rowNumberDisplayMode="static"
          enableRowActions
          positionActionsColumn={"last"}
          renderRowActions={({ row, table }) => (
            <div className="hstack gap-2 fs-1">
              <button
                onClick={() => {
                  dispatch(viewManufacturer({ id: row.original._id }));
                  setViewModel(true);
                }}
                className="btn btn-icon btn-sm btn-warning rounded-pill"
              >
                <i className="mdi mdi-eye"></i>
              </button>
              <button
                onClick={() => {
                  dispatch(updatetManufacturerById({ id: row.original._id }));
                  setIsOpen(true);
                }}
                className="btn btn-icon btn-sm btn-info rounded-pill"
              >
                <i className="bx bxs-edit-alt" />
              </button>
              <button
                onClick={() => {
                  setDeleteInfo({
                    message: `Do You Really Want To Delete ${row.original?.name}`,
                    header: "Delete Model",
                  });
                  setDeleteModal(true);
                  setId(row.original._id);
                }}
                className="btn btn-icon btn-sm btn-danger rounded-pill"
              >
                <i className="bx bxs-trash" />
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
      )}
    </Management_container>
  );
}
