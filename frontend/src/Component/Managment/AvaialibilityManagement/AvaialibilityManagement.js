import { useEffect, useMemo, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
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

const initialFilter = {
  package: "",
  country: "",
  state: "",
  city: "",
  vehicleType: "",
  status: "",
};

const url = BASE_URL + "/avaialibilityManagement";

export default function AvaialibilityManagement() {
  const [list, setList] = useState();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // if(data.success){
        //   let arr = [];
        //       data?.avaialibilities?.map((ele, i) => {
        //         arr.push({
        //           index: i + 1,
        //           country: ele.country,
        //           state: ele.state || "NA",
        //           city:ele.city || "NA",
        //           createdAt: ele.createdAt || "NA",
        //         });
        //       });
        //       setList(arr);

        // }
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
        accessorKey: "country",
        header: "Country",
        size: 100,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 100,
      },
      {
        accessorKey: "city",
        header: "City",
      },

      {
        accessorFn: (row) => row.createdAt.slice(0, 10),
        id: "createdAt",
        header: "Created At",
      },
    ],
    [],
  );

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      url +
        "?country=" +
        filter.country +
        "&state=" +
        filter.state +
        "&city=" +
        filter.city +
        "&status=" +
        filter.status +
        "&vehicleType=" +
        filter.vehicleType,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          let arr = [];
          data?.allRentalFare?.map((ele, i) => {
            arr.push({
              index: i + 1,
              country: ele.country.name,
              state: ele.state?.name || "NA",
              city: ele.city?.name || "NA",
              createdAt: ele.createdAt || "NA",
            });
          });
          setList(arr);
        }
      });
  }

  function handleClick(e) {
    e.preventDefault();
    navigate("/addAvaialibilityManagement");
  }

  function handleClick2(e) {
    e.preventDefault();
  }

  return (
    <Management_container title={"AvaialibilityManagement"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark
                  handleClick={handleClick}
                  title={"Add AvaialibilityManagement"}
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
                options={["country", "state", "city"]}
              />
            </div>
          </div>
        </div>
      </div>
      <MaterialReactTable
        columns={columns}
        data={list || []}
        enableRowActions
        positionActionsColumn={"last"}
        renderRowActions={({ row, table }) => (
          <div className='hstack gap-2 fs-1'>
            <button
              onClick={() => {}}
              className='btn btn-icon btn-sm btn-warning rounded-pill'
            >
              <i className='mdi mdi-eye'></i>
            </button>
            <button
              onClick={() => {}}
              className='btn btn-icon btn-sm btn-info rounded-pill'
            >
              <i className='bx bxs-edit-alt' />
            </button>
            <button
              onClick={() => {}}
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
    </Management_container>
  );
}
