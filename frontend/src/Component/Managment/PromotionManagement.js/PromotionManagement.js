import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useEffect, useMemo, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";

import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import BASE_URL from "../../../config/config";
import Fetchdata from "../../../Custom Hook/FetchData";


const initialFilter = {
  title:"",
  forUsers:"",
  countryId:"",
  stateId:"",
  cityId:"",
  status:""
}
export default function PromotionManagement() {
  const [filter,setFilter] = useState(initialFilter)
  const [list ,setList] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
     fetch(BASE_URL+"/promotion/self/filter",{method:"GET"})
     .then(res=>res.json())
     .then(data=>{
      if(data.success){
        let arr = data.promotions.map(ele=>{
          let obj = {};
          obj.title = ele.title;
          obj.country = ele?.country.name;
          obj.state = ele?.state.name;
          obj.city = ele?.city.name;
          obj.forUsers = ele?.forUsers.join();
          obj.status = ele?.status;
          obj.description = ele?.description;
          obj.createdAt = ele?.createdAt;
          obj.updatedAt = ele?.updatedAt;
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
          accessorKey: "country",
          header: "Country",
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
          accessorKey: "state",
          header: "State",
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
          accessorKey: "city",
          header: "City",
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
        {
          accessorFn: (row) => row.updatedAt.slice(0, 10),
          id: "updatedId",
          enableColumnFilter: false,
          enableColumnActions: false,
          header: "Updated At",
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

    function handleSubmit (){
      fetch(BASE_URL+"/promotion/self/filter/?title="+filter.title+"&status="+filter.status+"&forUsers="+filter.forUsers,{method:"GET"})
      .then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = data.promotions.map(ele=>{
            let obj = {};
            obj.title = ele.title;
            obj.country = ele.country.name;
            obj.state = ele.state.name;
            obj.city = ele.city.name;
            obj.forUsers = ele.forUsers.join();
            obj.status = ele.status;
            obj.description = ele.description;
            obj.createdAt = ele.createdAt;
            obj.updatedAt = ele.updatedAt;
            return obj
          })
          setList(arr)
        }
      })
    }
    function handleClick(){
        navigate("/addPromotion")    
    }


    function reset(){

    }
    return(
        <Management_container title={"Promotion Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add New"} />
              </div>
              <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField">

        <Text_Input
        input={filter}
        lebel_text={"Title :"}
        setKey={"title"}
        setInput={setFilter}
      />
      <Selection_Input
      options={["ACTIVE","INACTIVE"]}
        input={filter}
        setInput={setFilter}
        lebel_text={"Status : "}
        setKey={"status"}
      />
      <Selection_Input
      options={["ADMIN","DRIVER","RIDER"]}
        input={filter}
        setInput={setFilter}
        lebel_text={"User Type : "}
        setKey={"forUsers"}
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
