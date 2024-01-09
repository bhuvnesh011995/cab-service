import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {RemoveRedEye,Lock,ModeEditOutline ,DeleteForever } from '@mui/icons-material/';
import { toast } from "react-toastify";
import DeleteModal from "../../DeleteModel/DeleteModel";
const initialFilter = {
    name:"",
    country:"",
    status:""
}

export default function StateManagement (){
    const [filter,setFilter]  = useState(initialFilter);
    const [list,setList] = useState();
    const navigate = useNavigate();
    const url = BASE_URL+"/states/filter/";
    const [isOpen ,setIsOpen] = useState(false)
    const [id, setId] = useState(null)
    const [deleteInfo, setDeleteInfo] = useState(null)

    useEffect(() => {
        fetch(url, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) =>{
            let arr = [];
            data?.stateList?.map((ele, i) => {
              arr.push({
                index: i + 1,
                id: ele._id,
                name: ele.name,
                stateCode: ele.stateCode,
                country:ele.country,
                status: ele.status,
                createdAt: ele.createdAt || "",
              });
            });
            setList(arr);
          }
          );
      }, []);

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
            accessorKey: "stateCode",
            header: "State Code",
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



    function handleClick(){
        navigate("/addState")
    }

    function handleSubmit(){
        fetch(`${url}?name=${filter.name}&country=${filter.country}&status=${filter.status}`,{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
          let arr = [];
          data?.stateList?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              stateCode: ele.stateCode,
              country:ele.country,
              status: ele.status,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
        }
        );
    }

    function handleDelete(rowId) {
      const deleteUrl = BASE_URL + "/state/" + rowId;
    
      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            const filterList = list.filter((item) => item.id !== rowId)
              setList(filterList)
              setIsOpen(false)
                return  response.json()
          }         
        })
        .then((data)=>{
    if(data.success ) toast.success(data.message)
    else toast.success(data.message)
        })
      .catch((error) => {
          console.error("Error occurred while deleting:", error);
        });
    }

    function handleClick2(){
            setFilter(initialFilter)
    }

    return(
        <Management_container title={"STATE MANAGEMENT"}>
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
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
            <BtnDark handleClick={handleClick} title={"Add State"} />
        </div>
        <Filter_Option 
            input={filter}
            setInput={setFilter}
            initialInput={initialFilter}
            btn1_title={"Search"}
            handleClick1={handleSubmit}
            handleClick2={handleClick2}
            btn2_title={"reset"}
            options={["name","status","country"]}
            /></div></div></div></div>
            {/* <Table
            heading={["Sr no", "Name","State Code","Country", "Status", "Created At", "Action"]}
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
            <DeleteForever   onClick={() => {
            setDeleteInfo({
              message: `Do You Really Want To Delete ${row.original?.name}`,
              header: "Delete Model",
            });
            setIsOpen(true);
            setId(row.original.id);
          }} />
          </IconButton>
        </Box>
      )}
      />
        </Management_container>
    )
}