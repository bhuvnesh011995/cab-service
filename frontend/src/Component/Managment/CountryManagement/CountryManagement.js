import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";


let initialFilter = {
    name:"",
    status:""
}
export default function CountryManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();
    const navigate = useNavigate();
    const url = BASE_URL+"/country/filter/";

    useEffect(()=>{
        fetch(url,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          let arr = [];
          data?.countryList?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              id: ele._id,
              countryCode: ele.countryCode,
              dialCode:ele.dialCode,
              status: ele.status,
              createdAt: ele.createdAt || ele.createAt || "",
            });
          });
          setList(arr);
        })
    },[])


    const columns = useMemo(()=>[
      {
        accessorKey:"index",
        header:"Sr No",
        size:50
      },
      
      {
        accessorKey:"name",
        header:"Name"
      },{
        accessorKey:"countryCode",
        header:"Country Code",
        size : 50
      },{
        accessorKey:"dialCode",
        header:"Dial Code",
        size:50
      },{
        accessorKey:"status",
        header:"Status",
        size:80
      },
      
      // {
      //   accessorFn: (row) => row.createdAt.slice(0, 10),
      //   id: "createdAt",
      //   header: "Created At",
      // }
    ],[])

    function handleClick(){
        navigate("/addCountry")
    }
    function handleSubmit(){
        fetch(`${url}?name=${filter.name}&status=${filter.status}`,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          let arr = [];
          data?.countryList?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              countryCode: ele.countryCode,
              dialCode:ele.dialCode,
              status: ele.status,
              createdAt: ele.createdAt || ele.createAt || "",
            });
          });
          setList(arr);
        })
    }
        const handleDelete = (id) =>{
              alert(id)
        }
          console.log("list",list)


    function handleClick2(){
        setFilter(initialFilter)
    }

    return(
        <Management_container
        title={"Country Management"}
        >
           <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
        <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
            <BtnDark handleClick={handleClick} title={"Add Country"} />
        </div>
        <Filter_Option 
            input={filter}
            setInput={setFilter}
            initialInput={initialFilter}
            btn1_title={"Search"}
            handleClick1={handleSubmit}
            handleClick2={handleClick2}
            btn2_title={"reset"}
            options={["name","status"]}
            /></div></div></div></div>

        {/* <Table
            heading={["Sr no", "Name","Country Code","Dial Code", "Status", "Created At", "Action"]}
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
          <IconButton onClick={()=>handleDelete(row.original.id)} >        
            <DeleteForever  />
          </IconButton>
        </Box>
      )}
      />


        </Management_container>
    )
}