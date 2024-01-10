import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useEffect, useMemo, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";

const initialFilter = {
  country:"",
  state:"",
  city:"",
  vehicleType:"",
  status:""
}
const url = BASE_URL+"/individualFare/"
export default function IndividualFareManagement(){
    const [list,setList] = useState();
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter)
    const [isOpen ,setIsOpen] = useState(false)
    const [id, setId] = useState(null)
    const [deleteInfo, setDeleteInfo] = useState(null)

    useEffect(()=>{
        fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) =>{
      
      if(data.success){
        let arr = [];
            data?.allIndiFare?.map((ele, i) => {
              arr.push({
                index: i + 1,
                id: ele._id,
                country: ele.country?.name,
                state: ele.state?.name || "NA",
                city:ele.city?.name || "NA",
                vehicleType:ele.vehicleType?.name || "NA",
                status: ele.status,
                createdAt: ele.createdAt || "NA",
              });
            });
            setList(arr);
      }
        
    }
      );
    },[])

    const columns = useMemo(
      () => [
        {
          accessorKey: "index",
          header: "Sr No",
          size: 50,
        },
        {
          accessorKey: "country",
          header: "Country",
          size: 100,
        },
        {
          accessorKey: "state",
          header: "State",
          size: 100,
        },
        {
          accessorKey:"city",
          header:"City"
        },
        {
          accessorKey:"vehicleType",
          header:"Vehicle Type"
        },
        {
          accessorKey: "status",
          header: "status",
          size: 80,
        },
        {
          accessorFn: (row) => row.createdAt.slice(0, 10),
          id: "createdAt",
          header: "Created At",
        },
      ],
      []
    );


    function handleClick(){
        navigate("/addIndividualFare")
    }

    function handleSubmit(e){
     
      e.preventDefault();
      fetch(`${url}?country=${
        filter.country+"&state="+
        filter.state+"&city="+
        filter.city+"&vehicleType="+
        filter.vehicleType+"&status="+
        filter.status
      }`,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
            data?.allIndiFare?.map((ele, i) => {
              arr.push({
                index: i + 1,
                country: ele.country?.name,
                state: ele.state?.name || "NA",
                city:ele.city?.name || "NA",
                vehicleType:ele.vehicleType?.name || "NA",
                status: ele.status,
                createdAt: ele.createdAt || "NA",
              });
            });
            setList(arr);
        }
      })

    }

    const deleteModel=(rowId)=>{
      const deleteUrl = BASE_URL + "/individualFare/" + rowId;
  
    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
        const filterModel = list.filter((data)=> data.id !== rowId)
        setList(filterModel)
        setIsOpen(false)
        return response.json()
        } 
      })
      .then((item)=>{
        if(item.success) toast.success(item.message) 
        else toast.error.apply(item.message)
      })
      .catch((error) => {
        console.error("Error occurred while deleting admin:", error);
      });
  
    }

    function handleClick2(){

    }
    return(
        <Management_container title={"Individual Fare Management"}>
             <div class="row">
    <div class="col-lg-13">
      <div class="card">
      <DeleteModal
        info={deleteInfo}
        show={isOpen}
        setShow={setIsOpen}
        handleDelete={deleteModel}
        arg={id}
      />
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
               <BtnDark handleClick={handleClick}
            title={"Add New"}
            /> 
            </div>
            <Filter_Option
        input={filter}
        setInput={setFilter}
        initialInput={initialFilter}
        btn1_title={"Search"}
        handleClick1={handleSubmit}
        handleClick2={handleClick2}
        btn2_title={"reset"}
        options={["country","state","city","status","vehicleType"]}
        /></div></div></div></div>


        {/* <Table
        heading={[
          "Sr no",
          "Country",
          "State",
          "City",
          "Vehicle Type",
          "status",
          "created At",
          "Action",
        ]}
        list={list}
      /> */}
      <MaterialReactTable
      columns={columns}
      data={list || []}
      enableRowActions
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
          <IconButton      onClick={() => {
            setDeleteInfo({
              message: `Do You Really Want To Delete ${row.original?.id}`,
              header: "Delete Model",
            });
            setIsOpen(true);
            setId(row.original.id);
          }}>
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
        </Management_container>
    )
}