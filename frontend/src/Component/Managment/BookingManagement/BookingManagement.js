import { useEffect, useMemo, useState } from "react";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import Filter_Option from "../../Common/Filter_option";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
  DriveEta
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";

const initialFilter ={
    country:"",
    state:"",
    city:"",
    status:"",
    bookingType:""
}

export default function BookingManagement() {
    const [list,setList] = useState([]);
    const [filter,setFilter] = useState(initialFilter);
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(BASE_URL+"/booking/filter",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
              let arr = [];
              data.bookings?.map((ele,i)=>{
                let obj = {
                  index:i+1,
                  bookingId:ele._id,
                  lastName:ele.lastName,
                  mobile:ele.mobile,
                  email:ele.email,
                  status:ele.status,
                  wallet:ele.wallet.balance,
                  verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
                  createdAt:ele.createdAt,
                  id:ele._id,
                  country:ele.address?.country?.name,
                  state:ele.address?.state?.name,
                  city:ele.address?.city?.name,
                  pincode:ele.address.pincode,
                  place:ele.address?.place,
                  createdBy:ele.createdBy?.name,
                  updatedBy:ele.updatedBy?.name,
                  updatedAt:ele.updatedAt,
                  DOB:ele.DOB
                };
                if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
                else obj.documentStatus = <tiIcons.TiTick />
    
                arr.push(obj)
                
              })
              setList(arr)
            }
          })
    },[])


    function handleSubmit() {
        
    }

    function handleClick2() {
        return
    }
    function handleClick() {
        navigate("/addBooking")
    }


    const columns = useMemo(
        () => [
            
          {
            accessorKey:"bookingId",
            header:"Booking ID",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          
          {
            accessorKey:"pickUpAddress",
            header:"PickUp Address",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          
          {
            accessorKey:"dropAddress",
            header:"Drop Address",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          
          {
            accessorKey:"runMode",
            header:"Run Type",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorFn: (row) => `${row.dfirstName} ${row.dlastName}`,
            id: 'dname',
            header: 'Driver Name',
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorFn: (row) => `${row.rfirstName} ${row.rlastName}`,
            id: 'rname',
            header: 'Rider Name',
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorKey:"rMobile",
            header:"Rider Mobile",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorKey:"rEmail",
            header:"Rider Email",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorKey: "status",
            enableColumnFilter: false,
            header: "status",
            enableColumnActions: false,
            size: 80,
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
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
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          }
        ],
        []
      );


    return(
        <Management_container title={"Booking Management"}>
        <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
        <BtnDark handleClick={handleClick} title={"Add Make"} />
      </div>
      <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField" >
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
      options={["ACTIVE","INACTIVE"]}
      />
      <Text_Input
      input={filter}
      setInput={setFilter}
      lebel_text={"Booking Type"}
      setKey={"bookingType"}
      />

      <div>
            <BtnDark handleClick={handleSubmit} title={"Search"}/>
            <BtnDark handleClick={handleClick2} title={"Reset"}/>
        </div>
      </div></div>
      </form>

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
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1px' }}>
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



      </div></div></div></div>
        </Management_container>
    )
};
