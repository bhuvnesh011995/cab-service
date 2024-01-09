import { useEffect, useMemo, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
const initialTax = {
    title:"",
    value:0,
    status:"",
    taxType:""
}
export default function TaxManagement() {
    const [tax,setTax] = useState(initialTax)
    const navigate = useNavigate();
    const [list,setList] = useState([]);


    useEffect(()=>{
        fetch(BASE_URL+"/tax/filter",{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.taxes.map(ele=>{
                    return {
                        title:ele.title,
                        value:ele.value.$numberDecimal,
                        status:ele.status,
                        taxType:ele.taxType,
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
            accessorKey: "taxType",
            header: "Tax Type",
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
            accessorKey: "value",
            enableColumnFilter: false,
            header: "Value(%)",
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



    function handleClick(){
        navigate("/addTax")
    }

    function handleSubmit(){

        fetch(BASE_URL+"/tax/filter/?title="+tax.title+"&status="+tax.status,{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.taxes.map(ele=>{
                    return {
                        title:ele.title,
                        value:ele.value.$numberDecimal,
                        status:ele.status,
                        taxType:ele.taxType,
                        createdAt:ele.createdAt
                    }
                })
                setList(arr)
            }
        })

    }
    function reset(){

    }

    return(
        <Management_container title={"Tax Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add Tax"} />
              </div>
              <form style={{margin:"50px"}}>
              <div className="row">
                <div className="col-lg-2 inputField">
                <Text_Input
                input={tax}
                setInput={setTax}
                lebel_text={"Title"}
                setKey={"title"}
                />
                <Selection_Input
                input={tax}
                setInput={setTax}
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