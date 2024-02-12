import { useEffect, useState, useMemo } from "react";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import AddVehicleType from "../VehicleTypeManagement/AddVehicleType";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVehicleType,
  getAllVehicleType,
  deleteVehicleType,
  updateVehicleTypeById,
  cleanVehicleTypeStatus,
  getViewVehicleType,
  filterVehicleType,
} from "../../../Redux/features/vehicleTypeReducer";
import ViewVehicleType from "./ViewVehicleType";
import Filter_Option from "../../Common/Filter_option";
let url = BASE_URL + "/vehicletype/filter/";

const initialFilter = {
  name: "",
  runMode: "",
  state: "",
};

export default function VehicleTypeManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [options, setOptions] = useState([]);
  const [list, setList] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicleType());
  }, []);

  const vehicleTypeData = useSelector(getAllVehicleType);
  const vehicleTypeStatus = useSelector((state) => state.vehicleType.status);
  const message = useSelector((state) => state.vehicleType.message);

  useEffect(() => {
    if (vehicleTypeStatus === "deleted") {
      setIsOpen(false);
      toast.success(message);
      dispatch(cleanVehicleTypeStatus);
    } else if (vehicleTypeStatus === "added") {
      setShow(false);
      toast.success(message);
    } else if (vehicleTypeStatus === "update") {
      setShow(false);
      toast.success("updated");
    }
  }, [vehicleTypeStatus]);

  console.log("vehicleTypeData", vehicleTypeData);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "seatingCapacity",
        header: "Seating Capacity",
        size: 40,
      },
      {
        accessorFn: (row) => row.createdAt?.slice(0, 10),
        id: "createdAt",
        header: "Created At",
        Cell: ({ row }) => (
          <div className=''>
            {moment(row.original.createdAt).format("YYYY/DD/MM")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
    ],
    [],
  );

  function handleSubmit() {
    dispatch(filterVehicleType(filter));
  }

  function handleDelete(rowId) {
    dispatch(deleteVehicleType(rowId));
  }

  function handleClick2(e) {
    return;
  }

  return (
    <Management_container title={"Vehicle Management"}>
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
            {show && <AddVehicleType show={show} setShow={setShow} />}
            {openView && (
              <ViewVehicleType show={openView} setShow={setOpenView} />
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
                  title={"Add New"}
                />
              </div>

              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      lebel_text={"Name :"}
                      setKey={"name"}
                      setInput={setFilter}
                    />
                    <Selection_Input
                      options={options}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Run Mode : "}
                      setKey={"runMode"}
                    />
                    <div>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />
                      <BtnDark handleClick={handleClick2} title={"Reset"} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Table
        heading={["Sr no", "Name","Run Mode","Seating Capacity","Image selected", "Status", "Action"]}
        list={list}
      /> */}
      <MaterialReactTable
        columns={columns}
        data={vehicleTypeData || []}
        enableRowNumbers={true}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        rowNumberDisplayMode='static'
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <div className='hstack gap-2 fs-1'>
            <button
              onClick={() => {
                dispatch(getViewVehicleType({ id: row.original._id }));
                setOpenView(true);
              }}
              className='btn btn-icon btn-sm btn-warning rounded-pill'
            >
              <i className='mdi mdi-eye'></i>
            </button>
            <button
              onClick={() => {
                dispatch(updateVehicleTypeById({ id: row.original._id }));
                setShow(true);
              }}
              className='btn btn-icon btn-sm btn-info rounded-pill'
            >
              <i className='bx bxs-edit-alt' />
            </button>
            <button
              onClick={() => {
                setDeleteInfo({
                  message: `Do You Really Want To Delete ${row.original?.name}`,
                  header: "Delete Model",
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
    </Management_container>
  );
}
