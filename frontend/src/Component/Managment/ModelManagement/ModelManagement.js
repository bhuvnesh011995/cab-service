import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import AddModel from "./AddModel";
import DeleteModal from "../../DeleteModel/DeleteModel";
import ModelUpdate from "../ModelManagement/ModelUpdate"
import { useSelector,useDispatch } from "react-redux";
import { fetchModel,getAllModel,deleteModels } from "../../../Redux/features/ModelReducer";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
let initialFilter = {
  make: "",
  name: "",
  status: "",
};
     

export default function ModelManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const [isOpen ,setIsOpen] = useState(false)
  const [show ,setShow] = useState(false)
  const [showUpdate ,setShowUpdate] = useState(false)
  const [id, setId] = useState(null)
  const [deleteInfo, setDeleteInfo] = useState(null)
   const [model, setModel] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
   useEffect(()=>{
    dispatch(fetchModel());
   },[])
  
   const modelData = useSelector(getAllModel);
   const modelstatus = useSelector((state) => state.model.status);
   const message = useSelector((state) => state.model.message);
   
  useEffect(()=>{
    if(modelstatus === "deleted") 
    {
      setIsOpen(false) 
    toast.success(message) 
    }
    else if(modelstatus === "added") {
      setShow(false) 
      toast.success(message) 
    }
    else if(modelstatus === "update") {
      setShowUpdate(false) 
      toast.success("updated") 
    }
},[modelstatus])
 
  const columns = useMemo(
    () => [
    
      {
        accessorKey: "make.name",
        header: "Manufacturer",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Model",
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

  const url = BASE_URL + "/model/filter/";

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      `${url}?name=${filter.name}&status=${filter.status}&make=${filter.make}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.modelList?.map((ele, i) => {
            arr.push({
              index: i + 1,
              model: ele.name,
              make: ele.make.name,
              manufacturer: ele.make?._id,
              status: ele.status,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
        }
      });
  }

   const deleteModel=(id)=>{
   dispatch(deleteModels(id))

  }
  const handleUpdate =(data)=>{
     setModel(data)
     setShowUpdate(true)
  }


  function handleClick2() {}

  return (
    <Management_container title={"Model Management"}>
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
      {show && <AddModel show={show} setShow={setShow} />}
      {showUpdate && <ModelUpdate show={showUpdate} setShow={setShowUpdate}  data={model}   />}

       <
              div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={()=>{setShow(true)}} title={"Add Model"} />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"reset"}
                options={["name", "status", "make"]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Table
        heading={["Sr no", "Make", "Model", "Status", "Created At", "Action"]}
        list={list}
      /> */}
      <MaterialReactTable
      columns={columns}
      data={modelData || []}
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
          </IconButton>
          <IconButton  onClick={()=>handleUpdate(row.original)}>
            <ModeEditOutline />
          </IconButton>
          <IconButton
           onClick={() => {
            setDeleteInfo({
              message: `Do You Really Want To Delete ${row.original?.name}`,
              header: "Delete Model",
            });
            setIsOpen(true);
            setId(row.original._id);
          }}
           >
            <DeleteForever />
          </IconButton>
        </Box>
      )}
      />
    </Management_container>
  );
}


