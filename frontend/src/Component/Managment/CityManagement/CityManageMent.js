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
    const [polygons,setPolygons] = useState([])


  let url = BASE_URL+"/city/"

    useEffect(()=>{
      fetchData()

    },[])


    function fetchData(){
      fetch(url,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          let arr = [];
          let polygon = [];
          data?.cities?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              state: ele.state,
              country:ele.country,
              status: ele.status,
              createdAt: ele.createdAt || "",
              update:false,
              _id:ele.territory?._id
            });

            
              polygon.push({
                _id:ele.territory?._id,
                area:ele.territory?.area
              })
           
          });
          setPolygons(polygon)
          setList(arr);
        }
      })
    }

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
            let polygon = [];
          data?.cities?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              state: ele.state,
              country:ele.country,
              status: ele.status,
              createdAt: ele.createdAt || "",
              update:false,
              _id:ele.territory?._id

            });

            polygon.push({
              _id:ele.territory?._id,
              area:ele.territory?.area
            })


          });
          setList(arr);
          setPolygons(polygon)
          }
        })
    }



    function updateMap(id){
      let data = {};
      polygons.map(ele=>{
        if(ele._id===id){
          data.area = ele.area
        }
      })
      fetch(BASE_URL+"/city/map/"+id,{
        method:"PUT",
        body:JSON.stringify(data),
        headers:{
          "Content-type":"application/json; charset=UTF-8"
        }
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          setList(preVal=>(
            preVal.map(ele=>{
                if(ele._id===id){
                    ele.update = false
                }
                return ele
            })
        ))
        }
      })
    }

  

    return(
        <Management_container title={"City Management"}>
        
        <MapService setData={setList} polygon={polygons} setPolygon={setPolygons} />
    
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
      renderRowActions={({row,table})=>!row.original.update ?(
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
      ):(
        <Box sx={{display:"flex"}}>
        <button className="m-1" onClick={()=>updateMap(row.original._id)}>Update Map</button>
        <button className="m-1" onClick={fetchData}>cancel</button>
        </Box>
      )}
      />
        </Management_container>
    )
}