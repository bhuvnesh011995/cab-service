import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";

import { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import MapService from "./MapService";

const initialFilter ={
    text:""
}



export default function CityManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();
    const [mapLayers, setMapLayers] = useState([]);

   


  let url = BASE_URL+"/city/"

    useEffect(()=>{
      fetch(url,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          data?.cities?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              state: ele.state,
              country:ele.country,
              status: ele.status,
              createdAt: ele.createdAt || "",
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
          accessorKey: "state",
          header: "State",
          size: 100,
        },
        {
          accessorKey:"country",
          header:"Country"
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

    function handleClick(e){
      e.preventDefault();
        navigate('/addCity')
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(url+"?text="+filter.text,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          if(data.success){
            let arr = [];
          data?.cities?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              state: ele.state,
              country:ele.country,
              status: ele.status,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
          }
        })
    }

  

    return(
        <Management_container title={"City Management"}>
        
        <MapService mapLayers={mapLayers} setMapLayers={setMapLayers} />
    
           <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
           
            <BtnDark handleClick={handleClick} title={"Add City"} />
      </div>
      <div className="m-3 d-flex" style={{width:"100%",justifyContent:"center"}}>
        <input style={{width:"40%", borderRadius:"30px"}}  onChange={e=>setFilter(preVal=>({...preVal,text:e.target.value}))}
          type="text"
          placeholder="search..."
          value={filter.text}
        />
        <button onClick={e=>handleSubmit(e)} type="button" className="btn m-1 ms-2 btn-outline-primary waves-effect waves-light">{"Search"}</button>
    </div></div></div></div></div>
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
      <p>{JSON.stringify(mapLayers,0,2)}</p>
        </Management_container>
    )
}