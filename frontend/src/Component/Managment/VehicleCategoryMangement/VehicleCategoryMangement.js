import { useEffect, useMemo, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import { Box, IconButton } from '@mui/material';
import { authContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import AddVehicleCategory from "../VehicleCategoryMangement/AddVehicleCategory"
import DeleteModal from "../../DeleteModel/DeleteModel";
import { toast } from "react-toastify";
let initialFilter = {
  name: "",
  status: "",
};
export default function VehicleCategoryManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [id, setId] = useState(null) 
  const [deleteInfo, setDeleteInfo] = useState(null)
  const navigate = useNavigate();
  const url = BASE_URL+"/make/filter/";
  const {admin}=useContext(authContext) 
  const [permissions, setPermissions] = useState({
    canView: false,
    canEdit: false,
  });
  const api = BASE_URL+'/vehicleCategory/'

  const getAllVehicleCategory = async function(res,req,){
    await axios.get(api)
    .then((response) =>{
      setList(response.data?.vehicleCategory ) 
    })
  }
    useEffect(()=>{
      getAllVehicleCategory()
    },[])


    console.log("list",list)
  const columns = useMemo(()=>[
  {
      accessorKey:"vehicleCategory",
      header:"Name"
    },
    {
      accessorFn:(row)=>row.createdAt?.slice(0,10),
      id:"createdAt",
      header:"createdAt",
      size:100
    },
    {
      accessorKey:"status",
      header:"Status",
      size:80
    },
  ],
  [])


 function handleReset(e){
    e.preventDefault()
    setFilter(initialFilter)
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>{
        let arr = []
        data?.makeList?.map((ele,i)=>{
          arr.push({
            index:i+1,
            id:ele._id,
            name:ele.name,
            status:ele.status,
            createdAt:ele.createdAt

          })
        })
        setList(arr)
      }
      );



return  
}

function handleDelete(rowId) {
  const deleteUrl = BASE_URL + "/vehicleCategory/" + rowId;

  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response) {
      getAllVehicleCategory()
            setIsOpen(false)
            toast.success(response.message)

      } else {
        console.error("Failed to delete admin");
        toast.error(response.message)
      }
    })
    .catch((error) => {
      console.error("Error occurred while deleting admin:", error);
    });
}

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}?name=${filter.name}&status=${filter.status}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>{
        let arr = []
        data?.makeList?.map((ele,i)=>{
          arr.push({
            index:i+1,
            name:ele.name,
            status:ele.status,
            createdAt:ele.createdAt
          })
        })
        setList(arr)
      }
      );
  }
  function handleClick(data){
    navigate('/addVehicleCategory',{state:{id:data._id,vehicleCategory:data.vehicleCategory,status:data.status}})
    }
    
  return (
    <Management_container title={"VehicleCategory"}>
       <div class="row">
    <div class="col-lg-13">
      <div class="card">
      <DeleteModal
        info={deleteInfo}
        show={isOpen}
        setShow={setIsOpen}
        handleDelete={handleDelete}
        arg={id}
      />
      {show && <AddVehicleCategory show={show} setShow={setShow} />}
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
    
    
    {(admin.role === "superadmin" || (admin.permissions && admin.permissions.includes("addMake"))) && (
  <BtnDark handleClick={()=>{setShow(true)}} title={"Add VehicleCategory"} />
)}
      </div>
      <Filter_Option 
      input={filter}
      setInput={setFilter}
      initialInput={initialFilter}
      btn1_title={"Search"}
      handleClick1={handleSubmit}
      handleClick2={handleReset} 
        btn2_title={"Reset"} 
      options={["name","status"]}
      /></div></div></div></div>

      {/* <Table
        heading={["Sr no", "Name", "Status", "Created At", "Action"]}
        list={list}
      /> */}
        {(admin.role === "superadmin" || (admin.permissions && admin.permissions.includes("viewTable"))) && (
      <MaterialReactTable
      columns={columns || []}
      data={list || []}
      enableRowNumbers= {true}
       rowNumberDisplayMode= 'static'
      enableRowActions
      positionActionsColumn={'last'}
      renderRowActions={({row,table})=>(
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1px' }}>
          <IconButton>
            <RemoveRedEye />
          </IconButton>
          <IconButton>
            <Lock />
          </IconButton  >
          <IconButton   onClick={() => handleClick(row.original)}>
            <ModeEditOutline />
          </IconButton>
          <IconButton 
       
          onClick={() => {
            setDeleteInfo({
      message : `Do You Really Want To Delete ${row.original?.vehicleCategory}`,
     header : "Delete Vehicle Category" 
          });
        setIsOpen(true)
        setId(row.original._id)
        }}
          
          
          >
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
      )}
    </Management_container>
  );
}
