import { useEffect, useState,useMemo } from "react";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Table from "../../Common/Table";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import AddVehicleType from "../VehicleTypeManagement/AddVehicleType"
let url = BASE_URL+"/vehicletype/filter/"

const initialFilter = {
  name:"",
  runMode:""
}

export default function VehicleTypeManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const [options,setOptions] = useState([]);
    const [list, setList] = useState();
    const navigate = useNavigate()
    const [isOpen ,setIsOpen] = useState(false)
    const [show ,setShow] = useState(false)
  const [id, setId] = useState(null)
  const [deleteInfo, setDeleteInfo] = useState(null)
    useEffect(()=>{
        fetch(BASE_URL+"/runMode/",{
            method:"GET",
        }).then(res=>res.json())
        .then(data=>{
            if (data.success){
                let arr = []
                console.log(data)
                data.data?.map(ele=>arr.push(ele.name))
                setOptions(arr)
            }
        })

        fetch(url,{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
              let arr = [];
              data?.data?.map((ele, i) => {
                let mode = [];
                ele.runMode?.map(ele=>mode.push(ele.name))
                arr.push({
                  id: ele._id,
                  index: i + 1,
                  name: ele.name,
                  mode: mode.join(),
                  runMode: ele.runMode.map((item) => item._id),
                  seatingCapacityName:ele.seatingCapacityName,
                  seatingCapacity:ele.seatingCapacity,
                  img:ele.img,
                  status: ele.status,
                });
              });
              setList(arr);
            }
        })
    },[])


    const columns = useMemo(
      () => [
        {
          accessorKey: "index",
          header: "Sr No",
          size: 50,
        },
        {
          accessorKey: "name",
          header: "Name",
          size: 100,
        },
        {
          accessorKey: "mode",
          header: "Run Mode",
          size: 100,
        },
        {
          accessorKey:"seatingCapacity",
          header:"Seating Capacity",
          size:40
        },
        {
          accessorKey:"img",
          header: "Image Selected"
        },
        {
          accessorKey: "status",
          header: "status",
          size: 80,
        },
      ],
      []
    );


    function handleSubmit(e){
       fetch(url+"?name="+filter.name+"&runMode="+filter.runMode,{
    method:"GET"
       }).then(res=>res.json())
       .then(data=>{
           if(data.success){
               setList(
                   data.data.map((ele, i) => {
                       let mode = [];
                       ele.runMode?.map(ele=>mode.push(ele.name))
                     return (
                       <tr key={i}>
                         <td>{i + 1}</td>
                         <td>{ele.name}</td>
                         <td>{mode.join()}</td>
                         <td>{ele.seatingCapacity}</td>
                         <td>{ele.img}</td>
                         <td>{ele.status}</td>
                         <td>""</td>
                       </tr>
                     );
                   })
                 )
           }
       })
    }


    function handleDelete(rowId) {
      const deleteUrl = BASE_URL + "/vehicleType/" + rowId;
    
      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            const filterList = list.filter((item) => item.id !== rowId)
              setList(filterList)
              setIsOpen(true)
                return  response.json()
          }         
        })
        .then((data)=>{
    if(data.success ) toast.success(data.message)
    else toast.error(data.message)
        })
      .catch((error) => {
          console.error("Error occurred while deleting:", error);
        });
    }

    function handleUpdate(data){
      navigate('/updateVehicleType',{state:{model:data}})
      }

    function handleClick2(e){
        return
    }

    return(
        <Management_container title={"Vehicle Management"}>
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
      {show && <AddVehicleType show={show} setShow={setShow} />}
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
      <BtnDark handleClick={()=>{setShow(true)}} title={"Add New"} /></div>
      <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField" >
        <Text_Input
              input={filter}
              lebel_text={"Name :"}
              setKey={"name"}
              setInput={setFilter}
            />
            <Selection_Input
            options={options}
              input={filter}
              setInput={setFilter}
              lebel_text={"Run Mode : "}
              setKey={"runMode"}
            />
            <div>
                <BtnDark handleClick={handleSubmit} title={"Search"}/>
                <BtnDark handleClick={handleClick2} title={"Reset"}/>
            </div>
        </div>
      </div>
    </form></div></div></div></div>
      {/* <Table
        heading={["Sr no", "Name","Run Mode","Seating Capacity","Image selected", "Status", "Action"]}
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
          <IconButton  onClick={()=>handleUpdate(row.original)}>
            <ModeEditOutline />
          </IconButton>
          <IconButton   onClick={() => {
            setDeleteInfo({
              message: `Do You Really Want To Delete ${row.original?.name}`,
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