import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import BASE_URL from "../../../config/config";
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
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import Title from "../../Common/Title";
import DriverDetails from "./DriverDetails";


const initialFilter = {
    name:"",
    email:"",
    mobile:"",
    status:""
}

export default function DriverManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState([])
    const [isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
      fetch(BASE_URL+"/driver/filter",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          data.drivers.map((ele,i)=>{
            let obj = {
              index:i+1,
              firstName:ele.firstName,
              lastName:ele.lastName,
              mobile:ele.mobile,
              email:ele.email,
              status:ele.status,
              wallet:ele.wallet.balance,
              verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
              createdAt:ele.createdAt,
              id:ele._id
            };
            if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
            else obj.documentStatus = <tiIcons.TiTick />

            arr.push(obj)
            
          })
          setList(arr)
        }
      })
    },[])


    const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'name',
        header: 'Name',
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
        accessorKey:"email",
        header:"Email",
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
        accessorKey:"mobile",
        header:"Mobile",
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
        accessorKey:"documentStatus",
        enableColumnFilter: false,
        header:"Document",
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: 'center', //change head cell props
        },
        size:20,
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
        accessorKey:"wallet",
        enableColumnFilter: false,
        header:"Wallet",
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: 'center', //change head cell props
        },
        size:20,
        Cell:({renderedCellValue})=>(
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:"center",
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
        accessorKey: "verified",
        enableColumnFilter: false,
        header: "Verified",
        enableColumnActions: false,
        muiTableHeadCellProps: {
            align: 'center', //change head cell props
          },
        size:20,
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




    function handleSubmit(){
      fetch(BASE_URL+"/driver/filter?name=" +
      filter.name +
      "&email=" +
      filter.email +
      "&mobile=" +
      filter.mobile +
      "&status=" +
      filter.status,
    {
      method: "GET",
    }).then(res=>res.json())
    .then(data=>{
      if(data.success){
        let arr = [];
        data.drivers.map((ele,i)=>{
          let obj = {
            index:i+1,
            firstName:ele.firstName,
            lastName:ele.lastName,
            mobile:ele.mobile,
            email:ele.email,
            status:ele.status,
            wallet:ele.wallet.balance,
            verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
            createdAt:ele.createdAt,
            id:ele._id
          };
          if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
          else obj.documentStatus = <tiIcons.TiTick />

          arr.push(obj)
          
        })
        setList(arr)
      }
    })
    }

    function reset(){

    }

    function handleLicExp(){
      fetch(BASE_URL+"/driver/filter/?licExp=true",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          data.drivers.map((ele,i)=>{
            let obj = {
              index:i+1,
              firstName:ele.firstName,
              lastName:ele.lastName,
              mobile:ele.mobile,
              email:ele.email,
              status:ele.status,
              wallet:ele.wallet.balance,
              verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
              createdAt:ele.createdAt,
              id:ele._id
            };
            if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
            else obj.documentStatus = <tiIcons.TiTick />
  
            arr.push(obj)
            
          })
          setList(arr)
        }
      })
    }


    function handleDocPen(){
      fetch(BASE_URL+"/driver/filter/?docPen=true",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          data.drivers.map((ele,i)=>{
            let obj = {
              index:i+1,
              firstName:ele.firstName,
              lastName:ele.lastName,
              mobile:ele.mobile,
              email:ele.email,
              status:ele.status,
              wallet:ele.wallet.balance,
              verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
              createdAt:ele.createdAt,
              id:ele._id
            };
            if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
            else obj.documentStatus = <tiIcons.TiTick />
  
            arr.push(obj)
            
          })
          setList(arr)
        }
      })
    }

    function handleApproved(){
      fetch(BASE_URL+"/driver/filter/?approved=true",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          data.drivers.map((ele,i)=>{
            let obj = {
              index:i+1,
              firstName:ele.firstName,
              lastName:ele.lastName,
              mobile:ele.mobile,
              email:ele.email,
              status:ele.status,
              wallet:ele.wallet.balance,
              verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />,
              createdAt:ele.createdAt,
              id:ele._id
            };
            if(!ele.aadhar?.verified || !ele.license?.verified || !ele.pan?.verified) obj.documentStatus = <rsIcons.RxCross2 />
            else obj.documentStatus = <tiIcons.TiTick />
  
            arr.push(obj)
            
          })
          setList(arr)
        }
      })
    }

    return(
        <Management_container title={"Driver Management"}>

          {isOpen && <DriverDetails show={isOpen} setIsOpen={setIsOpen} />}
          
            <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"center",zIndex:"2"}}>
    <button onClick={e=>navigate("/addDriver")} type="button" className="btn m-2 btn-outline-primary waves-effect waves-light"><i class="bi bi-plus-lg"></i>Add Driver</button>

    <button onClick={handleLicExp} type="button" className="btn m-2 btn-outline-primary waves-effect waves-light">License expired Driver</button>

    <button onClick={handleDocPen} type="button" className="btn m-2 btn-outline-primary waves-effect waves-light">Doc Approval Pending Driver</button>

    <button onClick={handleApproved} type="button" className="btn m-2 btn-outline-primary waves-effect waves-light">Approved Drivers</button>

      </div>
      <form style={{ margin: "50px" }}>
                <div className="row">
                  <div className="col-lg-2 inputField">

                  <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"name"}
                      lebel_text={"Name :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"email"}
                      lebel_text={"Email :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"mobile"}
                      lebel_text={"Mobile :"}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status : "}
                      setKey={"status"}
                    />

                  <div style={{ margin: "20px", marginTop: "50px" }}>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />

                      <BtnDark handleClick={reset} title={"Reset"} />
                    </div>
                  </div>
                </div>
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
          <IconButton onClick={()=>setIsOpen(!isOpen)}>
            <RemoveRedEye />
          </IconButton>
          <IconButton>
            <Lock />
          </IconButton>
          <IconButton>
            <ModeEditOutline />
          </IconButton>
          <IconButton onClick={(e)=>{navigate("/vehicleManagement",{state:{id:row.original.id}})}}>
            <DriveEta />
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
}