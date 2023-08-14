import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import map from "../../img/map.png"
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import { useJsApiLoader ,GoogleMap, DrawingManager, Polygon } from '@react-google-maps/api';

const initialFilter ={
    text:""
}


const containerStyle = {
  width: '400px',
  height: '400px'
};

export default function CityManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();
    const [ map,setMap] =useState(null)
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

    const onLoad = useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
  
      setMap(map)
    }, [])
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCw2eA_PC8e7Fgev-5JUX5rPCmVuS27asY"
  })



  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);



    return(
        <Management_container title={"City Management"}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
      ) : <></>}
        
    
           <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
           
            <BtnDark handleClick={handleClick} title={"Add City"} />
      </div>
      <div className="m-3 d-flex" style={{width:"100%",justifyContent:"center"}}>
        <input style={{width:"40%", borderRadius:"30px", margin:"10px"}}  onChange={e=>setFilter(preVal=>({...preVal,text:e.target.value}))}
          type="text"
          placeholder="search..."
          value={filter.text}
        />
        <BtnDark handleClick={handleSubmit} title={"Search"}/>
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
        </Management_container>
    )
}