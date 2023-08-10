import { useLocation, useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../../config/config";
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";

export default function VehicleDetails() {
    const [list,setList] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    fetch(BASE_URL + "/vehicle/id/" + state.id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setVehicle(data.vehicle));
  }, []);

  useEffect(()=>{
    let arr = [];
    if(vehicle?.registration){
        arr.push({
            name:"Vehicle Registration",
            number:vehicle.registration.number,
            expiryDate:vehicle?.registration?.expiryDate?.slice(0,10),
            verified:vehicle?.registration?.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
        })
    }
    if(vehicle?.insurance){
        arr.push({
            name:"Vehicle Insurance",
            number:"NA",
            expiryDate:vehicle?.insurance?.expiryDate?.slice(0,10),
            verified:vehicle?.insurance?.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
        })
    }
    if(vehicle?.permit){
        arr.push({
            name:"Permit",
            number:"NA",
            expiryDate:vehicle?.permit?.expiryDate?.slice(0,10),
            verified:vehicle?.permit?.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
        })
    }
    if(vehicle?.pollutionCertificate){
        arr.push({
            name:"Pollution Certificate",
            number:"NA",
            expiryDate:vehicle?.pollutionCertificate?.expiryDate?.slice(0,10),
            verified:vehicle?.pollutionCertificate?.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
        })
    }

    if(arr.length) setList(arr)
    else setList([])
  },[vehicle])


  const columns = useMemo(()=>[
    {
        accessorKey: "name",
        header: 'Document Name',
        enableColumnActions: false,
        size:100,
        Cell:({renderedCellValue})=>(
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: 'center', //change head cell props
        },
      },
      {
          accessorKey: "number",
          header: 'Number',
          enableColumnActions: false,
          size:100,
          Cell:({renderedCellValue})=>(
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {renderedCellValue}
            </Box>
          ),
          muiTableHeadCellProps: {
            align: 'center', //change head cell props
          },
        },
        {
            accessorKey: "expiryDate",
            header: 'Expiry Date',
            enableColumnActions: false,
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
              accessorKey: "verified",
              header: 'Verified',
              enableColumnActions: false,
              size:100,
              Cell:({renderedCellValue})=>(
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {renderedCellValue}
                </Box>
              ),
              muiTableHeadCellProps: {
                align: 'center', //change head cell props
              },
            },
  ],[])

  return (
    <Management_container title={"Vehicle Details"}>
      <div className="card">
        <div className="card-body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Plate No
              </label>
              <span className="col mb-2">{vehicle?.plateNo}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Vehicle Type
              </label>
              <span className="col mb-2">{vehicle?.vehicleType?.name}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Make
              </label>
              <span className="col mb-2">{vehicle?.make?.name}</span>
            </div>

            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Model
              </label>
              <span className="col mb-2">{vehicle?.model}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Fuel Type
              </label>
              <span className="col mb-2">{vehicle?.fuelType}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Year
              </label>
              <span className="col mb-2">{vehicle?.year}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Seating Name
              </label>
              <span className="col mb-2">{vehicle?.seatingCapacityName}</span>
            </div>

            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Color
              </label>
              <span className="col mb-2">{vehicle?.color}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Verified By
              </label>
              <span className="col mb-2">{vehicle?.verifiedBy?.name}</span>
            </div>
            <div className="row m-2" style={{ width: "220px", margin: "10px" }}>
              <label className="col" style={{ fontWeight: "600" }}>
                Created At
              </label>
              <span className="col mb-2">{vehicle?.createdAt?.slice(0,10)}</span>
            </div>
          </div>
        </div>
        <div className="card-body">
            <h3>Document Details</h3>
            <MaterialReactTable
      columns={columns}
      data={list || []}
      enableRowActions
      enableRowNumbers
      displayColumnDefOptions={{ 'mrt-row-actions': { 
        size: 100,
        muiTableHeadCellProps: {
        align: 'center', //change head cell props
      },},
      'mrt-row-numbers': {
        header:"Sr No",
        // enableColumnOrdering: true, //turn on some features that are usually off
        muiTableHeadCellProps: {
          sx: {
            fontSize: '1.2rem',
          },
        },
      },
     }}
      positionActionsColumn={'last'}
      renderRowActions={({row,table})=>(
        <Box sx={{ display: 'flex', flexWrap: 'nowrap'}}>
          <IconButton>
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

    </Management_container>
  );
}
