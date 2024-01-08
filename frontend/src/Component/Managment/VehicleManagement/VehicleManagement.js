import { useLocation, useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../../config/config";

export default function VehicleManagement() {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [list, setList] = useState();

  useEffect(() => {
    if (!state) {
      fetch(BASE_URL + "/vehicle", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let arr = [];
            data.vehicles.map((ele, i) => {
              let obj = {
                id: ele._id,
                plateNo: ele.plateNo,
                vehicleType: ele.vehicleType?.name,
                make: ele.make?.name,
                model: ele.model,
                year: ele.year,
                seatingCapacity: ele.seatingCapacity,
                color: ele.color,
                status: ele.status,
                createdAt: ele.createdAt,
                verified: ele.verified ? (
                  <tiIcons.TiTick />
                ) : (
                  <rsIcons.RxCross2 />
                ),
              };
              if (
                !ele.insurance?.verified ||
                !ele.permit?.verified ||
                !ele.pollutionCertificate?.verified ||
                !ele.registration?.verified
              )
                obj.documentStatus = <rsIcons.RxCross2 />;
              else obj.documentStatus = <tiIcons.TiTick />;

              arr.push(obj);
            });
            setList(arr);
          }
        });
    } else {
      fetch(BASE_URL + "/vehicle/" + state?.id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let arr = [];
            data.vehicles.map((ele, i) => {
              let obj = {
                id: ele._id,
                plateNo: ele.plateNo,
                vehicleType: ele.vehicleType?.name,
                manufacturer: ele.make?.name,
                model: ele.model,
                year: ele.year,
                seatingCapacity: ele.seatingCapacity,
                color: ele.color,
                status: ele.status,
                createdAt: ele.createdAt,
                verified: ele.verified ? (
                  <tiIcons.TiTick />
                ) : (
                  <rsIcons.RxCross2 />
                ),
              };
              if (
                !ele.insurance?.verified ||
                !ele.permit?.verified ||
                !ele.pollutionCertificate?.verified ||
                !ele.registration?.verified
              )
                obj.documentStatus = <rsIcons.RxCross2 />;
              else obj.documentStatus = <tiIcons.TiTick />;

              arr.push(obj);
            });
            setList(arr);
          }
        });
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "plateNo",
        header: "Plate No",
        enableColumnActions: false,
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        accessorKey: "vehicleType",
        header: "Vehicle Type",
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "make",
        header: "manufacturer",
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "model",
        header: "Model",
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "year",
        header: "Year",
        size: 100,
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
        accessorKey: "seatingCapacity",
        header: "Seacting Capacity",
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "color",
        header: "Color",
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "documentStatus",
        header: "Documents",
        enableColumnFilter: false,
        enableColumnActions: false,
        size: 100,
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
        accessorKey: "verified",
        enableColumnFilter: false,
        header: "Verified",
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
        size: 20,
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
    []
  );
  return (
    <Management_container title={"Vehicle Managment"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                {state && (
                  <BtnDark
                    handleClick={() =>
                      navigate("/addVehicle", { state: { email: state.email } })
                    }
                    title={"Add New"}
                  />
                )}
              </div>

              <MaterialReactTable
                columns={columns}
                data={list || []}
                enableRowActions
                enableRowNumbers
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
                  <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                    <IconButton
                      onClick={() =>
                        navigate("/vehicleDetails", {
                          state: { id: row.original.id },
                        })
                      }
                    >
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton>
                      <Lock />
                    </IconButton>
                    <IconButton>
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton>
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
