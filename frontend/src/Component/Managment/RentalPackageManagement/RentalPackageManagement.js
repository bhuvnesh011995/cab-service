import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";

const initialFilter = {
    name:"",
    status:""
}
const url = BASE_URL+"/rentalPackage/filter/"
export default function RentalPackageManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const navigate = useNavigate();
    const [list,setList] = useState();
    const [isOpen ,setIsOpen] = useState(false)
    const [id, setId] = useState(null)
    const [deleteInfo, setDeleteInfo] = useState(null)

    useEffect(()=>{
        fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) =>{
        if(data.success){
        
          let arr = [];
        data?.packages?.map((ele, i) => {
          arr.push({
            index: i + 1,
            id: ele._id,
            name: ele.name,
            maxDuration: ele.maxDuration,
            maxDistance: ele.maxDistance.$numberDecimal ,
            status: ele.status,
            createdAt: ele.createdAt || "",
          });
        });
        setList(arr);
          // setList(
          //   data?.packages?.map((ele, index) => {
          //     return (
          //       <tr key={index}>
          //         <td>{index + 1}</td>
          //         <td>{ele.name}</td>
          //         <td>{ele.maxDuration || "NA"}</td>
          //         <td>{ele.maxDistance.$numberDecimal || "NA"}</td>
          //         <td>{ele.status}</td>
          //         <td>{ele.createdAt || "NA"}</td>
          //         <td>""</td>
          //       </tr>
          //     );
          //   })
          // )
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
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "maxDuration",
          header: "Max Duration",
          size: 100,
        },
        {
          accessorKey: "maxDistance",
          header: "Max Distance",
          size: 100,
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
        navigate("/addPackage")
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch(`${url}?name=${filter.name}&status=${filter.status}`,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          if(data.success){
            let arr = [];
        data?.packages?.map((ele, i) => {
          arr.push({
            index: i + 1,
            name: ele.name,
            maxDuration: ele.maxDuration,
            maxDistance: ele.maxDistance.$numberDecimal ,
            status: ele.status,
            createdAt: ele.createdAt || "",
          });
        });
        setList(arr);
          }
        })
    }

    const deleteModel=(rowId)=>{
      const deleteUrl = BASE_URL + "/rentalPackage/" + rowId;
  
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

    function handleClick2(e){
        e.preventDefault();
    }


    return(
        <Management_container title={"Rental Package Management"}>
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
        options={["name","status"]}
        /></div></div></div></div>

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
          <IconButton   onClick={() => {
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