import { useEffect, useState,useMemo } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import { MaterialReactTable } from "material-react-table";

import { Box, IconButton } from "@mui/material";
import BASE_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";

const initialFilter = {
  userType: "",
};
export default function SOSManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list,setList] = useState([])
  const navigate = useNavigate()


  useEffect(()=>{
    fetch(BASE_URL+"/sos/filter")
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            let arr = data.sos.map(ele=>{
                return {
                    bookingId:ele.booking._id,
                    userType:ele.userType,
                    firstName:ele.user.firstName,
                    lastName:ele.user.lastName,
                    lat:ele.location.lat,
                    lng:ele.location.lng,
                    createdAt:ele.createdAt
                }
            })
            setList(arr)
        }
    })
  },[])

  const columns = useMemo(
    () => [
      
    {
        accessorKey: "bookingId",
        header: "Booking ID",
        enableColumnActions: false,
        enableColumnFilter: false,
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
        accessorKey: "userType",
        enableColumnFilter: false,
        header: "User Type",
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
        accessorFn:(row)=>`${row.firstName} ${row.lastName}`,
        id: "user",
        enableColumnFilter: false,
        header: "User",
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
        accessorKey: "lat",
        header: "Latitude",
        enableColumnActions: false,
        enableColumnFilter: false,
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
        accessorKey: "lng",
        header: "Longitude",
        enableColumnActions: false,
        enableColumnFilter: false,
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
    []
  );

  function handleSubmit(){
    fetch(BASE_URL+"/sos/filter/?userType="+filter.userType)
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            let arr = data.sos.map(ele=>{
                return {
                    bookingId:ele.booking._id,
                    userType:ele.userType,
                    firstName:ele.user.firstName,
                    lastName:ele.user.lastName,
                    lat:ele.location.lat,
                    lng:ele.location.lng,
                    createdAt:ele.createdAt
                }
            })
            setList(arr)
        }
    })
  }

  function handleClick(){
    navigate("/addSos")

  }

  function reset(){


  }
  return (
    <Management_container title={"SOS Management"}>
      <div className="row">
        <div className="col-lg-13">
          <div className="card">
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"Add SOS"} />
              </div>

              <form className="m-2">
                <div className="row">
                  <div className="col-lg-2 inputField">
                    <SelectWithValue
                      input={filter}
                      setInput={setFilter}
                      setKey={"userType"}
                      label={"User Type"}
                      options={[
                        { value: "Rider", title: "Rider" },
                        { value: "Driver", title: "Driver" },
                      ]}
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
                data={list || []}
                enableRowNumbers
                displayColumnDefOptions={{
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
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
