import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { AddNewPage } from "./AddPage";
import moment from "moment";

const initialFilter = {
  text: "",
};
export default function PageManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState();
  const [filter, setFilter] = useState(initialFilter);
  useEffect(() => {
    fetch(BASE_URL + "/page", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.pages?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              metaDescription: ele.metaDescription,
              metaKey: ele.metaKey,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
        }
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "metaKey",
        header: "Meta Key",
        size: 80,
      },
      {
        accessorFn: (row) =>
          row.createdAt ? moment(row.createdAt).format("ll") : "NA",
        id: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  function handleSubmit() {
    fetch(BASE_URL + "/page/filter/?search=" + filter.text, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let arr = [];
          data?.pages?.map((ele, i) => {
            arr.push({
              index: i + 1,
              name: ele.name,
              metaDescription: ele.metaDescription,
              metaKey: ele.metaKey,
              createdAt: ele.createdAt || "",
            });
          });
          setList(arr);
          // setList(
          //   data.pages.map((ele, i) => {
          //     return (
          //       <tr key={i}>
          //         <td>{i + 1}</td>
          //         <td>{ele.name}</td>
          //         <td>{ele.metaDescription}</td>
          //         <td>{ele.metaKey}</td>
          //         <td>{ele.createdAt}</td>
          //         <td>""</td>
          //       </tr>
          //     );
          //   })
          // )
        }
      });
  }
  return (
    <Management_container title={"Page Management"}>
      {isOpen && <AddNewPage show={isOpen} setShow={setIsOpen} />}
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsOpen(true)}
                >
                  Add New
                </button>
              </div>
              <div
                className="m-3 d-flex"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <input
                  style={{ width: "40%", borderRadius: "30px", margin: "5px" }}
                  onChange={(e) =>
                    setFilter((preVal) => ({ ...preVal, text: e.target.value }))
                  }
                  type="text"
                  placeholder="search..."
                  value={filter.text}
                />
                <BtnDark handleClick={handleSubmit} title={"Search"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MaterialReactTable
        columns={columns}
        data={list || []}
        enableRowNumbers
        rowNumberMode="static"
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
