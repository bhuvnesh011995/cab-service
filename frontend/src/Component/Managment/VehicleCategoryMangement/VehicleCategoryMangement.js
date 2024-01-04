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
// import {authContext} from "../../Context/AuthContext"
// import { useContext } from "react";

let initialFilter = {
  name: "",
  status: "",
};
export default function VehicleCategoryManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const navigate = useNavigate();
  const url = BASE_URL+"/make/filter/";
  const {admin}=useContext(authContext) 
  const [permissions, setPermissions] = useState({
    canView: false,
    canEdit: false,
    // Add other permissions as needed
  });
  useEffect(() => {
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
  }, []);


  const columns = useMemo(()=>[
    {
      accessorKey:"index",
      header:"Sr No",
      size:50
    },{
      accessorKey:"name",
      header:"Name"
    },{
      accessorFn:(row)=>row.createdAt.slice(0,10),
      id:"createdAt",
      header:"Sr No",
      size:100
    },{
      accessorKey:"status",
      header:"Status",
      size:80
    },
  ],
  [])

  function handleClick(e) {
    e.preventDefault();
    navigate("/addVehicleCategory");
  }

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
  const deleteUrl = BASE_URL + "/make/" + rowId;

  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response) {
     
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
    
      } else {
        console.error("Failed to delete admin");
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
  function handleUpdate(data){
    navigate('/MakeUpdateManagement',{state:{Make:data}})
    }
    
  return (
    <Management_container title={"VehicleCategory"}>
       <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
    
    
    {(admin.role === "superadmin" || (admin.permissions && admin.permissions.includes("addMake"))) && (
  <BtnDark handleClick={handleClick} title={"Add VehicleCategory"} />
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
          <IconButton   onClick={() => handleUpdate(row.original)}>
            <ModeEditOutline />
          </IconButton>
          <IconButton   onClick={() => handleDelete(row.original.id)}>
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
      )}
    </Management_container>
  );
}
