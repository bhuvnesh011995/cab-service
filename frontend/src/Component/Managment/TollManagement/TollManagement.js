import { useState ,useMemo, useEffect} from "react"
import BASE_URL from "../../../config/config"
import BtnDark from "../../Common/Buttons/BtnDark"
import Text_Input from "../../Common/Inputs/Text_Input"
import Selection_Input from "../../Common/Inputs/Selection_input"
import { useNavigate } from "react-router-dom"
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import Management_container from "../../Common/Management_container";
import MapService from "./MapService"





const initialFilter = {
    title:"",
    status:""
}
export default function TollManagement() {
    const [filter,setFilter] = useState(initialFilter)
    const [list,setList] = useState([])
    const navigate = useNavigate()
    



    useEffect(()=>{
        fetch(BASE_URL+"/toll/filter",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.tolls.map(ele=>{
                    return {
                        title:ele.title,
                        amount:ele.amount.$numberDecimal,
                        location:ele.location,
                        status:ele.status,
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
            accessorKey: "title",
            header: "Toll Name",
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
            accessorKey: "amount",
            header: "Amount",
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
          },{
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
        fetch(BASE_URL+"/toll/filter",{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.tolls.map(ele=>{
                    return {
                        title:ele.title,
                        amount:ele.amount.$numberDecimal,
                        location:ele.location,
                        status:ele.status,
                        createdAt:ele.createdAt
                    }
                })
                setList(arr)
            }
        })
    }

    function handleClick(){
        navigate("/addToll")
    }

    function reset(){

    }



    return(
        <Management_container title={"Toll Management"}>
        <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
            <MapService data={list} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"Add Toll"} />
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
                lebel_text={"Status :"}
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
