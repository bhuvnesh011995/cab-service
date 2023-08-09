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
                  index: i + 1,
                  name: ele.name,
                  runMode: mode.join(),
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
          accessorKey: "runMode",
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

    function handleClick(e){
        navigate("/addVehicleType")
    }

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
    function handleClick2(e){
        return
    }

    return(
        <Management_container title={"Vehicle Management"}>
            <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
      <BtnDark handleClick={handleClick} title={"Add New"} /></div>
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
          <IconButton>
            <ModeEditOutline />
          </IconButton>
          <IconButton>
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
        </Management_container>
    )
}