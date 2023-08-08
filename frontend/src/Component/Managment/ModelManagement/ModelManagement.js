import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";
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
  make: "",
  name: "",
  status: "",
};

export default function ModelManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data?.modelList?.map((ele, i) => {
          arr.push({
            index: i + 1,
            model: ele.name,
            make: ele.make.name,
            status: ele.status,
            createdAt: ele.createdAt || "",
          });
        });
        setList(arr);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "Sr No",
        size: 50,
      },
      {
        accessorKey: "make",
        header: "Make",
        size: 100,
      },
      {
        accessorKey: "model",
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

  function handleClick() {
    navigate("/addModel");
  }
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
              status: ele.status,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
        }
      });
  }
  function handleClick2() {}

  return (
    <Management_container title={"Model Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add Model"} />
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
  );
}
