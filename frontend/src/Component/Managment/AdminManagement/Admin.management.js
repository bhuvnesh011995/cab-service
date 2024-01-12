import { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminManagement.css";
import Management_container from "../../Common/Management_container";
import Filter_Option from "../../Common/Filter_option";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import DeleteModal from "../../../Common/DeleteModal";
import AddNew from "./AddNew";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmins,
  getAllAdmins,
} from "../../../Redux/features/adminReducer";
const initialFilter = {
  name: "",
  username: "",
  status: "",
  from: "",
  to: "",
};
let url = BASE_URL + "/admin/filter/";
export default function AdminManagement() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  // const fetchAdmins = useCallback(
  //   async ({ name, username, status, from, to }) => {
  //     try {
  //       let url = new URL("/test/api/v1/admin/filter", BASE_URL);
  //       if (name) url.searchParams.set("name", name);
  //       if (username) url.searchParams.set("username", username);
  //       if (status) url.searchParams.set("status", status);
  //       if (from) url.searchParams.set("from", from);
  //       if (to) url.searchParams.set("to", to);

  //       let response = await axios.get(url.href);
  //       if (response.status === 200) setList(response.data);
  //       else toast.error("error while fetching admins");
  //     } catch (error) {
  //       toast.error("error while fetching admins");
  //       console.log(error);
  //     }
  //   },
  //   [BASE_URL]
  // );
  const dispatch = useDispatch();
  const AllAdmins = useSelector(getAllAdmins);
  const status = useSelector((state) => state.admins.status);
  const error = useSelector((state) => state.admins.error);
  useEffect(() => {
    if (status === "idle") dispatch(fetchAdmins());
    // fetchAdmins({});
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        header: "Created At",
        size: 100,
      },
    ],
    []
  );

  function handleUpdate(i) {
    navigate("/AdminDataUpdate", { state: { admin: i } });
  }

  async function handleDelete(id) {
    try {
      let response = await axios.delete(BASE_URL + "/admin/" + id);
      if (response.status === 204) {
        toast.success("admin deleted successfully");
        let arr = list.filter((ele) => ele._id !== id);
        setList(arr);
        setDeleteModalOpen(false);
        setId(null);
      } else toast.error("error while deleting admin");
    } catch (error) {
      console.log(error);
      toast.error("error while deleting admin");
    }
  }

  function handleClick(e) {
    e.preventDefault();
    navigate("/AddAdmin");
  }

  function handleSubmit(e) {
    console.log("hello", filter);
    dispatch(fetchAdmins(filter));
  }

  return (
    <Management_container title={"Admin Users"}>
      {adminModalOpen && (
        <AddNew show={adminModalOpen} setShow={setAdminModalOpen} />
      )}
      {deleteModalOpen && (
        <DeleteModal
          show={deleteModalOpen}
          setShow={setDeleteModalOpen}
          arg={id}
          handleDelete={handleDelete}
        />
      )}
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={() => setAdminModalOpen(true)}
                  title={"Add Admin"}
                />
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                options={["name", "username", "status", "from", "to"]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div class="row">
      <Table
        heading={[
          "Sr no",
          "Name",
          "Username",
          "status",
          "created At",
          "Action",
        ]}
        list={list}
      />
      </div> */}

      <MaterialReactTable
        columns={columns}
        data={AllAdmins}
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "1px" }}>
            <IconButton>
              <RemoveRedEye />
            </IconButton>
            <IconButton>
              <Lock />
            </IconButton>
            <IconButton onClick={() => handleUpdate(row.original)}>
              <ModeEditOutline />
            </IconButton>
            <IconButton
              onClick={() => {
                setId(row.original._id);
                setDeleteModalOpen(true);
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
