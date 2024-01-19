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
import AddManufacturer from "./AddManufacturer";
import UpdateManufacturer from "./UpdateManufacturer";
import { selectManufacturer,fetchManufacturer,deleteManufacturer, updatetManufacturerById, status } from "../../../Redux/features/ManufacturerReducer";
import { useSelector,useDispatch } from "react-redux";
import DeleteModal from "../../DeleteModel/DeleteModel";
import { getPermissions } from "../../../Redux/features/authReducer";
import { toast } from "react-toastify";


let initialFilter = {
  name: "",
  status: "",
};
  

export default function MakeManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const [isOpen,setIsOpen] = useState(false);
  const [deleteModal,setDeleteModal] = useState(false);
  const [open,setOpen] = useState(false);
  const [id, setId] = useState(null)
  const [deleteInfo, setDeleteInfo] = useState(null)
  const url = BASE_URL+"/make/filter/";
  const permissions = useSelector(getPermissions)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchManufacturer());
  }, []);

  

  const manufacturerData = useSelector(selectManufacturer);


  const manufacturerStatus = useSelector(status);
  const message = useSelector((state) => state.manufacturer.message);

  useEffect(()=>{
      if(manufacturerStatus === "deleted") 
      {
      setDeleteModal(false) 
      toast.success(message) 
      }
      else if(manufacturerStatus === "added") {
        setIsOpen(false) 
        toast.success(message) 
      }
      else if(manufacturerStatus === "updated") {
        setIsOpen(false) 
        toast.success("updated") 
      }
  },[manufacturerStatus])

  const handleDeleteClick = (manufacturerId) => { 
    dispatch(deleteManufacturer(manufacturerId));
  };
   
        
  const columns = useMemo(()=>[
     {
      accessorKey:"name",
      header:"Name"
    },
    {
      accessorFn: (row) => row.createdAt.slice(0, 10),
      id: "createdAt",
      header: "Created At",
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

  return (
    <Management_container title={"Manufacture"}>
       <div class="row">
    <div class="col-lg-13">
      <div class="card">
      <DeleteModal
        info={deleteInfo}
        show={deleteModal}
        setShow={setDeleteModal}
        handleDelete={handleDeleteClick}
        arg={id}
      />
      {isOpen && <AddManufacturer show={isOpen} setShow={setIsOpen}   />}

        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
       
    
    { (permissions.includes("All") || permissions.includes("addMake")) && (
  <BtnDark handleClick={()=>{setIsOpen(true)}} title={"Add Manufacture"} />
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
 { (permissions.includes("All") || permissions.includes("viewTable")) && (
        <MaterialReactTable
      columns={columns || []}
      data={manufacturerData || []}
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
          <IconButton   onClick={()=>{
            dispatch(updatetManufacturerById({id:row.original._id}))
            setIsOpen(true)
             }}>
            <ModeEditOutline />
          </IconButton>
          <IconButton    onClick={() => {
            setDeleteInfo({
              message: `Do You Really Want To Delete ${row.original?.name}`,
              header: "Delete Model",
            });
            setDeleteModal(true);
            setId(row.original._id);
          }}>
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
      )}
    </Management_container>
  );
}
