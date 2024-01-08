import { useEffect, useMemo, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
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
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";


const initialFilter = {
    title:"",
    status:""
}
export default function ReferralManagement() {
    const [filter,setFilter] = useState(initialFilter)
    const [list,setList]  = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(BASE_URL+"/referral/filter/",{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.referrals.map(ele=>{
                    let obj = {};
                    obj.title = ele.title;
                    obj.forUsers = ele.forUsers.join();
                    obj.status = ele.status;
                    obj.freeRideToReferrer = ele.freeRideToReferrer ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />;
                    obj.freeRideToApplier = ele.freeRideToApplier ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />;
                    obj.maxFreeRideToReferrer = ele.maxFreeRideToReferrer;
                    obj.amountToReferrer = ele.amountToReferrer.$numberDecimal;
                    obj.maxAmountToReferrer = ele.maxAmountToReferrer.$numberDecimal;
                    obj.amountToApplier  = ele.amountToApplier.$numberDecimal;
                    obj.createdAt = ele.createdAt;
                    obj.updatedAt = ele.updatedAt;

                    return obj
                })

                setList(arr)
            }
        })
    },[])


    const columns = useMemo(
        () => [
          {
            accessorKey: "title",
            header: "Title",
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
            accessorKey: "forUsers",
            header: "User Type",
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnFilter: false,
            enableColumnActions: false,
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
            accessorKey: "freeRideToReferrer",
            enableColumnFilter: false,
            header: "Free Ride To Referrer",
            enableColumnActions: false,
            muiTableHeadCellProps: {
                align: 'center', //change head cell props
              },
            size:150,
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
            accessorKey: "maxFreeRideToReferrer",
            header: "Max Free Ride To Referrer",
            enableColumnFilter: false,
            enableColumnActions: false,
            size: 150,
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
          },{
            accessorKey: "amountToReferrer",
            header: "Amount To Referrer",
            enableColumnFilter: false,
            enableColumnActions: false,
            size: 80,
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
          },{
            accessorKey: "maxAmountToReferrer",
            header: "Max Amount To Referrer",
            enableColumnFilter: false,
            enableColumnActions: false,
            size: 150,
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
            accessorKey: "freeRideToApplier",
            enableColumnFilter: false,
            enableColumnActions: false,
            header: "Free Ride To Applier",
            muiTableHeadCellProps: {
                align: 'center', //change head cell props
              },
            size:150,
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
            accessorKey: "amountToApplier",
            header: "Amount To Applier",
            enableColumnFilter: false,
            enableColumnActions: false,
            size: 40,
            Cell: ({ renderedCellValue }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
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
              align: "center",
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
        ],
        []
      );



    function handleClick(){
        navigate("/addReferral")
    }

    function handleSubmit(){

        fetch(BASE_URL+"/referral/filter/?title="+filter.title+"&status="+filter.status,{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.referrals.map(ele=>{
                    let obj = {};
                    obj.title = ele.title;
                    obj.forUsers = ele.forUsers.join();
                    obj.status = ele.status;
                    obj.freeRideToReferrer = ele.freeRideToReferrer ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />;
                    obj.freeRideToApplier = ele.freeRideToApplier ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />;
                    obj.maxFreeRideToReferrer = ele.maxFreeRideToReferrer;
                    obj.amountToReferrer = ele.amountToReferrer.$numberDecimal;
                    obj.maxAmountToReferrer = ele.maxAmountToReferrer.$numberDecimal;
                    obj.amountToApplier  = ele.amountToApplier.$numberDecimal;
                    obj.createdAt = ele.createdAt;
                    obj.updatedAt = ele.updatedAt;

                    return obj
                })

                setList(arr)
            }
        })

    }
    function reset(){

    }
    return(
        <Management_container title={"Referral Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add Referral"} />
              </div>
              <form style={{margin:"50px"}}>
              <div className="row">
                <div className="col-lg-2 inputField">
                <Text_Input
                input={filter}
                setInput={setFilter}
                lebel_text={"Title"}
                setKey={"title"}
                />
                <Selection_Input
                input={filter}
                setInput={setFilter}
                setKey={"status"}
                lebel_text={"Stateus :"}
                options={["ACTIVE","INACTIVE"]}
                />

                <div>
                    <BtnDark handleClick={handleSubmit} title={"Search"}/>
                    <BtnDark handleClick={reset} title={"reset"}/>
                </div>


                </div></div></form>
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
