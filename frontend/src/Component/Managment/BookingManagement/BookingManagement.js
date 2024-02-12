import { useEffect, useMemo, useState } from "react";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { MaterialReactTable } from "material-react-table";
import BookingService from "./BookingService";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
  DriveEta,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";

const initialFilter = {
  country: "",
  state: "",
  city: "",
  status: "",
  bookingType: "",
};

export default function BookingManagement() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + "/booking/filter", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.bookings?.map((ele, i) => {
            let obj = {
              bookingId: ele._id,
              pickUpAddress: ele.bookingInfo.pickUp.address,
              dropAddress: ele.bookingInfo.drop.address,
              runMode: ele.runMode.name,
              dfirstName: ele.driver.firstName,
              dlastName: ele.driver.lastName,
              rfirstName: ele.rider.firstName,
              rlastName: ele.rider.lastName,
              rMobile: ele.rider.mobile,
              rEmail: ele.rider.email,
              status: ele.status,
              createdAt: ele.createdAt,
            };
            arr.push(obj);
          });
          setList(arr);
        }
      });
  }, []);

  function handleSubmit() {
    fetch(
      BASE_URL +
        "/booking/filter/?country=" +
        filter.country +
        "&state=" +
        filter.state +
        "&city=" +
        filter.city +
        "&status=" +
        filter.status +
        "&bookingType=" +
        filter.bookingType,
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data.bookings?.map((ele, i) => {
            let obj = {
              bookingId: ele._id,
              pickUpAddress: ele.bookingInfo.pickUp.address,
              dropAddress: ele.bookingInfo.drop.address,
              runMode: ele.runMode.name,
              dfirstName: ele.driver.firstName,
              dlastName: ele.driver.lastName,
              rfirstName: ele.rider.firstName,
              rlastName: ele.rider.lastName,
              rMobile: ele.rider.mobile,
              rEmail: ele.rider.email,
              status: ele.status,
              createdAt: ele.createdAt,
            };
            arr.push(obj);
          });
          setList(arr);
        }
      });
  }

  function handleClick2() {
    return;
  }
  function handleClick() {
    window.open("http://localhost:3000/newBooking", "_blank", "noreferrer");
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "bookingId",
        header: "Booking ID",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },

      {
        accessorKey: "pickUpAddress",
        header: "PickUp Address",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },

      {
        accessorKey: "dropAddress",
        header: "Drop Address",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },

      {
        accessorKey: "runMode",
        header: "Run Type",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorFn: (row) => `${row.dfirstName} ${row.dlastName}`,
        id: "dname",
        header: "Driver Name",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorFn: (row) => `${row.rfirstName} ${row.rlastName}`,
        id: "rname",
        header: "Rider Name",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "rMobile",
        header: "Rider Mobile",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "rEmail",
        header: "Rider Email",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "status",
        enableColumnFilter: false,
        header: "status",
        enableColumnActions: false,
        size: 80,
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        enableColumnFilter: false,
        enableColumnActions: false,
        header: "Created At",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
    ],
    [],
  );

  return (
    <Management_container title={"Booking Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"New Booking"} />
              </div>
              {isOpen && <BookingService show={isOpen} setIsOpen={setIsOpen} />}
              <form>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Country"}
                      setKey={"country"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"State"}
                      setKey={"state"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"City"}
                      setKey={"city"}
                    />
                    <Selection_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status :"}
                      setKey={"status"}
                      options={["ACTIVE", "INACTIVE"]}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Booking Type"}
                      setKey={"bookingType"}
                    />
                  </div>
                  <div
                    style={{
                      margin: "15px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <BtnDark handleClick={handleSubmit} title={"Search"} />
                    <button
                      className='btn btn-outline-danger'
                      onClick={handleClick2}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>

              <MaterialReactTable
                columns={columns}
                data={list || []}
                enableRowActions
                enableRowNumbers
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnActions={false}
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    size: 100,
                    muiTableHeadCellProps: {
                      align: "center", //change head cell props
                    },
                  },
                  "mrt-row-numbers": {
                    header: "Sr No",
                    // enableColumnOrdering: true, //turn on some features that are usually off
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
                        navigate("/bookingDetails", {
                          state: { bookingId: row.original.bookingId },
                        });
                      }}
                      className='btn btn-icon btn-sm btn-warning rounded-pill'
                    >
                      <i className='mdi mdi-eye'></i>
                    </button>
                    <button
                      onClick={() => {}}
                      className='btn btn-icon btn-sm btn-info rounded-pill'
                    >
                      <i className='bx bxs-edit-alt' />
                    </button>
                    <button
                      onClick={() => {}}
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
