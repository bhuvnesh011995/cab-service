import { useEffect, useMemo, useState } from "react";
import "./AdminManagement.css";
import Table from "../Common/Table";
import Management_container from "../Common/Management_container";
import Filter_Option from "../Common/Filter_option";
import BtnDark from "../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/config";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
const initialFilter = {
  name: "",
  username: "",
  status: "",
  from: "",
  to: "",
};
let url = BASE_URL + "/admin/filter/";
export default function AdminManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
          let arr = [];
          data.map((ele, i) => {
            arr.push({
              index: i + 1,
              id: ele._id,
              name: ele.name,
              email: ele.email,
              username: ele.username,
              status: ele.status,
              createdAt: ele.createdAt,
            });
          });
          setList(arr);
        }
        //   setList(
        //     data?.map((ele, index) => {
        //       return (
        //         <tr key={index}>
        //           <td>{index + 1}</td>
        //           <td>{ele.name}</td>
        //           <td>{ele.username}</td>
        //           <td>{ele.status}</td>
        //           <td>{ele.createdAt}</td>
        //           <td>""</td>
        //         </tr>
        //       );
        //     })
        //   )
      );
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "username", //normal accessorKey
        header: "Username",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
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

  function handleDelete(rowId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (confirmDelete) {
      const deleteUrl = BASE_URL + "/admins/" + rowId;
      fetch(deleteUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetch(url, { method: "GET" })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                let arr = [];
                data.map((ele, i) => {
                  arr.push({
                    index: i + 1,
                    id: ele._id,
                    name: ele.name,
                    username: ele.username,
                    status: ele.status,
                    createdAt: ele.createdAt,
                  });
                });
                setList(arr);
              });
          } else {
            console.error("Failed to delete admin");
          }
        })
        .catch((error) => {
          console.error("Error occurred while deleting admin:", error);
        });
    }
  }

  function handleReset() {
    setFilter(initialFilter);
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.map((ele, i) => {
          arr.push({
            index: i + 1,
            id: ele._id,
            name: ele.name,
            username: ele.username,
            status: ele.status,
            createdAt: ele.createdAt,
          });
        });
        setList(arr);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${url}?name=${
        filter.name +
        "&username=" +
        filter.username +
        "&status=" +
        filter.status +
        "&from=" +
        filter.from +
        "&to=" +
        filter.to
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.map((ele, i) => {
          arr.push({
            index: i + 1,
            name: ele.name,
            username: ele.username,
            status: ele.status,
            email: ele.email,
            createdAt: ele.createdAt,
          });
        });
        setList(arr);
      });
  }

  return (
    <Management_container title={"Admin Users"}>
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div className="mb-3 text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/addAdmin")}
                >
                  Add New
                </button>
              </div>
              <MaterialReactTable
                initialState={{
                  showGlobalFilter: true, //show the global filter by default
                }}
                enableRowNumbers={true}
                rowNumberMode="static"
                enableHiding={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                columns={columns}
                data={list}
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
                    <IconButton onClick={() => handleDelete(row.original.id)}>
                      <DeleteForever />
                    </IconButton>
                  </Box>
                )}
              />
              {/* <div className="row">
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      placeholder="Enter Name"
                      name="name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username :
                    </label>
                    <input
                      placeholder="Enter Username"
                      name="username"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status :
                    </label>
                    <select className="form-control" name="status">
                      <option value={""}>Choose...</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor="from" className="form-label">
                      From :
                    </label>
                    <input type="date" name="from" className="form-control" />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor="to" className="form-label">
                      To :
                    </label>
                    <input type="date" name="to" className="form-control" />
                  </div>
                </div>
              </div> */}
              {/* <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleReset}
                btn2_title={"Reset"}
                options={["name", "username", "status", "from", "to"]}
              /> */}
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
    </Management_container>
  );
}
