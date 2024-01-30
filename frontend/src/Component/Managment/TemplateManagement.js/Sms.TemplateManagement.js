import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
  DriveEta
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import SmsTemplate from "./ShowSmsTemplate";
<<<<<<< Updated upstream

=======
import { useDispatch, useSelector } from "react-redux";
import {
  clearSmsTemplateStatus,
  deleteSmsTemplate,
  filterSmsTemplate,
  getSmsTemplateError,
  getSmsTemplateStatus,
  getSmsTemplates,
  smsTemplateById,
} from "../../../Redux/features/smsTemplateReducer";
import moment from "moment/moment";
import { AddNew } from "./AddSmsTemplate";
import { useSelect } from "@mui/base";
import { toast } from "react-toastify";
import {
  url,
  status as deleteModalStatus,
  doneDelete,
  openModal,
  showDeleteModal,
  closeModal,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";
>>>>>>> Stashed changes

const inittialFilter = {
    title:"",
    forUsers:"",
    status:""
}

export default function SmsTemplateManagement() {
<<<<<<< Updated upstream

    const [isOpen,setIsOpen] = useState(false)
    const [smsTemplate,setSmsTemplate] = useState();
    const [filter,setFilter] = useState(inittialFilter);
    const navigate = useNavigate();
    const [list,setList] = useState([]);

    useEffect(()=>{
        fetch(BASE_URL+"/template/sms/filter/",{method:"GET"}).then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = [];
                data.templates?.map(ele=>{
                  let obj = {};
                  obj.title = ele.title;
                  obj.forUsers = ele.forUsers.join();
                  obj.status = ele.status;
                  obj.createdAt = ele.createdAt;
                  obj.updatedAt = ele.updatedAt;
                  obj.body = ele.body;
                  
                  arr.push(obj)
                })
                setList(arr)
              }else{console.log(data)}
        }).catch((error)=>console.log("Error",error))
    },[])


    const columns = useMemo(
        () => [
          {
            accessorKey:"title",
            header:"Title",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorKey:"forUsers",
            enableColumnFilter: false,
            header:"For User",
            enableColumnActions: false,
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
            size:20,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorKey: "status",
            enableColumnFilter: false,
            header: "status",
            enableColumnActions: false,
            size: 80,
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
          },
          {
            accessorFn: (row) => row.createdAt.slice(0, 10),
            id: "createdAt",
            enableColumnFilter: false,
            enableColumnActions: false,
            header: "Created At",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          },
          {
            accessorFn: (row) => row.updatedAt.slice(0, 10),
            id: "updatedAt",
            enableColumnFilter: false,
            enableColumnActions: false,
            header: "Modified At",
            size:100,
            Cell:({renderedCellValue})=>(
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                {renderedCellValue}
              </Box>
            ),
            muiTableHeadCellProps: {
              align: 'center', //change head cell props
            },
          }
        ],
        []
      );


      function handleSubmit(e){
        e.preventDefault();

        fetch(BASE_URL+"/template/sms/filter/?title="+filter.title+"&forUsers="+filter.forUsers+"&status="+filter.status,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          if(data.success){
            let arr = [];
            data.templates?.map(ele=>{
              let obj = {};
              obj.title = ele.title;
              obj.forUsers = ele.forUsers.join();
              obj.status = ele.status;
              obj.createdAt = ele.createdAt;
              obj.updatedAt = ele.updatedAt;
              obj.body = ele.body;
  
              arr.push(obj)
            })
            setList(arr)
          }else{console.log(data)}
        }).catch((error)=>console.log("error",error))
=======
  const [isOpen, setIsOpen] = useState(false);
  const [smsTemplate, setSmsTemplate] = useState();
  const [filter, setFilter] = useState(inittialFilter);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const smsTemplates = useSelector(getSmsTemplates);
  const status = useSelector(getSmsTemplateStatus);
  const error = useSelector(getSmsTemplateError);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const show = useSelector(showDeleteModal);
  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteSmsTemplate({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  useEffect(() => {
    if (ready) {
      dispatch(filterSmsTemplate({}));
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "added") {
      toast.success("sms template added");
      setIsOpen(false);
      dispatch(clearSmsTemplateStatus());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearSmsTemplateStatus());
    } else if (status === "updated") {
      toast.success("sms template updated");
      setIsOpen(false);
      dispatch(clearSmsTemplateStatus());
    } else if (status === "deleted") {
      toast.success("sms template deleted successfully");
      dispatch(clearSmsTemplateStatus());
      dispatch(closeModal());
>>>>>>> Stashed changes
    }


    function handleClick(){
        navigate("/addSmsTemplate")
    }

    function reset(){

    }


<<<<<<< Updated upstream
    return (
        <Management_container title={"Email Template"}>
          <div class="row">
            <div class="col-lg-13">
              <div class="card">
                <div class="card-body">
                {isOpen && <SmsTemplate show={isOpen} template={smsTemplate} setIsOpen={setIsOpen}/>} 
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      zIndex: "2",
                    }}
                  >
                    <BtnDark handleClick={handleClick} title={"Add New"} />
                  </div>
    
                  <form className="m-2">
                  
                  <div className="row">
                    <div className="col-lg-2 inputField">
                        <Text_Input input={filter} setInput={setFilter} lebel_text={"Title"} setKey={"title"} />
                        <Selection_Input options={["ADMIN","DRIVER","RIDER"]} input={filter} setInput={setFilter} lebel_text={"For Users"} setKey={"forUsers"} />
                        <Selection_Input options={["ACTIVE","INACTIVE"]} input={filter} setInput={setFilter} lebel_text={"Status :"} setKey={"status"} />
                        <div style={{ margin: "20px", marginTop: "50px" }}>
                          <BtnDark handleClick={handleSubmit} title={"Search"} />
    
                          <BtnDark handleClick={reset} title={"Reset"} />
                        </div>
=======
  return (
    <Management_container title={"SMS Template"}>
      {show && <DeleteModalAdv />}
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              {/* {isOpen && (
                <SmsTemplate
                  show={isOpen}
                  template={smsTemplate}
                  setIsOpen={setIsOpen}
                />
              )} */}
              {isOpen && <AddNew show={isOpen} setShow={setIsOpen} />}
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsOpen(true)}
                >
                  Add SMS
                </button>
              </div>

              <form className="m-2">
                <div className="row">
                  <div className="col-lg-2 inputField">
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Title"}
                      setKey={"title"}
                    />
                    <Selection_Input
                      options={["ADMIN", "DRIVER", "RIDER"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"For Users"}
                      setKey={"forUsers"}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status :"}
                      setKey={"status"}
                    />
                    <div style={{ margin: "20px", marginTop: "50px" }}>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />

                      <BtnDark handleClick={reset} title={"Reset"} />
>>>>>>> Stashed changes
                    </div>
                  </div>
                  </form>
                  <MaterialReactTable
          columns={columns}
          data={list || []}
          enableRowActions
          enableRowNumbers
          displayColumnDefOptions={{ 'mrt-row-actions': { 
            size: 100,
            muiTableHeadCellProps: {
            align: 'center', //change head cell props
          },},
          'mrt-row-numbers': {
            header:"Sr No",
            // enableColumnOrdering: true, //turn on some features that are usually off
            muiTableHeadCellProps: {
              sx: {
                fontSize: '1.2rem',
              },
            },
          },
         }}
          positionActionsColumn={'last'}
          renderRowActions={({row,table})=>(
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1px' }}>
              <IconButton onClick={()=>{setIsOpen(true); setSmsTemplate({...row.original})}}>
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
                </div>
<<<<<<< Updated upstream
              </div>
=======
              </form>
              <MaterialReactTable
                columns={columns}
                data={smsTemplates}
                enableRowActions
                enableRowNumbers
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    size: 100,
                    muiTableHeadCellProps: {
                      align: "center", //change head cell props
                    },
                  },
                  "mrt-row-numbers": {
                    header: "Sr No",
                    // enableColumnOrdering: true, //turn on some features that are usually off
                    muiTableHeadCellProps: {
                      sx: {
                        fontSize: "1.2rem",
                      },
                    },
                  },
                }}
                positionActionsColumn={"last"}
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
                    <IconButton
                      onClick={() => {
                        setIsOpen(true);
                        setSmsTemplate({ ...row.original });
                      }}
                    >
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton>
                      <Lock />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(smsTemplateById({ id: row.original._id }));
                        setIsOpen(true);
                      }}
                    >
                      <ModeEditOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/template/sms/${row.original._id}`,
                            id: row.original._id,
                          })
                        );
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  </Box>
                )}
              />
>>>>>>> Stashed changes
            </div>
          </div>
        </Management_container>
      );
};
