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
  DriveEta,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import SmsTemplate from "./ShowSmsTemplate";
import moment from "moment/moment";
import { AddNew } from "./AddSmsTemplate";
import { toast } from "react-toastify";
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
import {
  url,
  status as deleteModalStatus,
  doneDelete,
  openModal,
  showDeleteModal,
  closeModal,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";

const inittialFilter = {
  title: "",
  forUsers: "",
  status: "",
};

export default function SmsTemplateManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [smsTemplate, setSmsTemplate] = useState();
  const [filter, setFilter] = useState(inittialFilter);
  const [ready, setReady] = useState(false);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const smsTemplates = useSelector(getSmsTemplates);
  const status = useSelector(getSmsTemplateStatus);
  const error = useSelector(getSmsTemplateError);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  const show = useSelector(showDeleteModal);

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
    }
  }, [status, error]);

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteSmsTemplate({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorFn: (row) =>
          row.forUsers?.length ? row.forUsers.join() : "NA",
        id: "forUsers",
        enableColumnFilter: false,
        header: "For Users",
        enableColumnActions: false,
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorKey: "status",
        enableColumnFilter: false,
        header: "status",
        enableColumnActions: false,
        size: 80,
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        enableColumnFilter: false,
        enableColumnActions: false,
        header: "Created At",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
      {
        accessorFn: (row) =>
          row.updatedAt ? moment(row.updatedAt).format("ll") : "NA",
        id: "updatedAt",
        enableColumnFilter: false,
        enableColumnActions: false,
        header: "Modified At",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
        muiTableHeadCellProps: {
          align: "center", //change head cell props
        },
      },
    ],
    [],
  );

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(filterSmsTemplate(filter));
  }

  function reset() {}

  return (
    <Management_container title={"SMS Template"}>
      {show && <DeleteModalAdv />}
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              {isOpen && <AddNew show={isOpen} setShow={setIsOpen} />}
              <div className='text-right'>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => setIsOpen(true)}
                >
                  Add SMS
                </button>
              </div>

              <form className='m-2'>
                <div className='row'>
                  <div className='col-lg-2 inputField'>
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

                      <button
                        className='btn btn-outline-danger'
                        onClick={reset}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <MaterialReactTable
                columns={columns}
                data={smsTemplates}
                enableRowActions
                enableRowNumbers
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnActions={false}
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
                  <div className='hstack gap-2 fs-1'>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setSmsTemplate({ ...row.original });
                      }}
                      className='btn btn-icon btn-sm btn-warning rounded-pill'
                    >
                      <i className='mdi mdi-eye'></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(smsTemplateById({ id: row.original._id }));
                        setIsOpen(true);
                      }}
                      className='btn btn-icon btn-sm btn-info rounded-pill'
                    >
                      <i className='bx bxs-edit-alt' />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          openModal({
                            url: `${BASE_URL}/template/sms/${row.original._id}`,
                            id: row.original._id,
                          }),
                        );
                      }}
                      className='btn btn-icon btn-sm btn-danger rounded-pill'
                    >
                      <i className='bx bxs-trash' />
                    </button>
                  </div>
                )}
                muiTableProps={{
                  sx: {
                    border: "1px solid rgba(232, 237, 234, 1)",
                  },
                }}
                muiTableHeadCellProps={{
                  sx: {
                    border: "1px solid rgba(232, 237, 234, 1)",
                  },
                }}
                muiTableBodyCellProps={{
                  sx: {
                    border: "1px solid rgba(232, 237, 234, 1)",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
