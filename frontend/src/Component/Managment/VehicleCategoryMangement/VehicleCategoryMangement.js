import { useEffect, useMemo, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { authContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import AddVehicleCategory from "../VehicleCategoryMangement/AddVehicleCategory";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { toast } from "react-toastify";
import { getPermissions } from "../../../Redux/features/authReducer";
import {
  cleanVehicleCategoryStatus,
  deleteVehicleCategory,
  fetchVehicleCategory,
  filterVehicleCategory,
  getAllVehicleCategory,
  getViewVehicleCategory,
  updateVehicleCategoryById,
} from "../../../Redux/features/vehicleCategoryReducer";
import { useDispatch, useSelector } from "react-redux";
import ViewVehicleCategory from "./ViewVehicleCategory";
let initialFilter = {
  vehicleCategory: "",
  status: "",
};
export default function VehicleCategoryManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const dispatch = useDispatch();
  const url = BASE_URL + "/make/filter/";
  const [updateData, setUpdateData] = useState(null);
  const [ready, setReady] = useState(false);
  const permissions = useSelector(getPermissions);

  const api = BASE_URL + "/vehicleCategory/";

  useEffect(() => {
    dispatch(fetchVehicleCategory());
  }, []);
  useEffect(() => {
    if (ready) {
      dispatch(filterVehicleCategory(filter));
    } else setReady(true);
  }, [ready]);

  const vehicleCategoryData = useSelector(getAllVehicleCategory);
  const vehicleCategoryStatus = useSelector(
    (state) => state.vehicleCategory.status,
  );
  const message = useSelector((state) => state.vehicleCategory.message);

  useEffect(() => {
    if (vehicleCategoryStatus === "deleted") {
      setIsOpen(false);
      toast.success(message);
      dispatch(cleanVehicleCategoryStatus());
    } else if (vehicleCategoryStatus === "added") {
      setShow(false);
      toast.success(message);
      dispatch(cleanVehicleCategoryStatus());
    } else if (vehicleCategoryStatus === "update") {
      setShow(false);
      toast.success("updated");
      dispatch(cleanVehicleCategoryStatus());
    }
  }, [vehicleCategoryStatus]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicleCategory",
        header: "Name",
      },
      {
        accessorFn: (row) => row.createdAt?.slice(0, 10),
        id: "createdAt",
        header: "createdAt",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
      },
    ],
    [],
  );

  function handleReset(e) {
    e.preventDefault();
    setFilter(initialFilter);
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data?.makeList?.map((ele, i) => {
          arr.push({
            index: i + 1,
            id: ele._id,
            name: ele.name,
            status: ele.status,
            createdAt: ele.createdAt,
          });
        });
        setList(arr);
      });

    return;
  }

  function handleDelete(rowId) {
    dispatch(deleteVehicleCategory(rowId));
  }

  function handleSubmit() {
    dispatch(filterVehicleCategory(filter));
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"VehicleCategory"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={handleDelete}
              arg={id}
            />
            {show && (
              <AddVehicleCategory
                show={show}
                setShow={setShow}
                viewData={updateData}
                setViewData={setUpdateData}
              />
            )}
            {openView && (
              <ViewVehicleCategory show={openView} setShow={setOpenView} />
            )}
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                {(permissions.includes("All") ||
                  permissions.includes("addModel")) && (
                  <BtnDark
                    handleClick={() => {
                      setShow(true);
                    }}
                    title={"Add VehicleCategory"}
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
                options={["vehicleCategory", "status"]}
              />
            </div>
          </div>
        </div>
      </div>

      {(permissions.includes("All") || permissions.includes("viewTable")) && (
        <MaterialReactTable
          columns={columns || []}
          data={vehicleCategoryData || []}
          enableRowNumbers={true}
          rowNumberDisplayMode='static'
          enableRowActions
          positionActionsColumn={"last"}
          renderRowActions={({ row, table }) => (
            <div className='hstack gap-2 fs-1'>
              <button
                onClick={() => {
                  dispatch(getViewVehicleCategory({ id: row.original._id }));
                  setOpenView(true);
                }}
                className='btn btn-icon btn-sm btn-warning rounded-pill'
              >
                <i className='mdi mdi-eye'></i>
              </button>
              <button
                onClick={() => {
                  dispatch(updateVehicleCategoryById({ id: row.original._id }));
                  setShow(true);
                }}
                className='btn btn-icon btn-sm btn-info rounded-pill'
              >
                <i className='bx bxs-edit-alt' />
              </button>
              <button
                onClick={() => {
                  setDeleteInfo({
                    message: `Do You Really Want To Delete ${row.original?.vehicleCategory}`,
                    header: "Delete Vehicle Category",
                  });
                  setIsOpen(true);
                  setId(row.original._id);
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
      )}
    </Management_container>
  );
}
