import { useState } from "react";
import Management_container from "../../../Common/Management_container";
import MaterialReactTable from "material-react-table";
import {
  RemoveRedEye,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import AddRiderNotification from "./AddNotification";

export default function RiderNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [{ accessorKey: "status", header: "status" }],
    [],
  );

  return (
    <Management_container title={"Notification To Rider"}>
      {isOpen && <AddRiderNotification show={isOpen} setShow={setIsOpen} />}
      <div class='row'>
        <div class='col-lg-12'>
          <div class='card'>
            <div class='card-body'>
              <div class='row'>
                <div class='col-md-12 text-right'>
                  <button
                    class='btn btn-primary'
                    onClick={() => setIsOpen(true)}
                  >
                    Add New
                  </button>
                </div>
                <div
                  class='justify-content-center row align-items-end mb-5'
                  style={{ alignItems: "end" }}
                >
                  <div class='col-md-3'>
                    {" "}
                    <label class='form-label'>Title</label>
                    <input className='form-control' placeholder='Enter Title' />
                  </div>
                  <div class='col-md-3'>
                    <label class='form-label'>Status</label>
                    <select class='form-control'>
                      <option>Choose...</option>
                      <option value='ACTIVE'>Active</option>
                      <option value='INACTIVE'>Inactive</option>
                    </select>
                  </div>

                  <div class='col-md-3'>
                    <button class='btn btn-primary me-3'>Search</button>
                    <button class='btn btn-danger me-3'>Reset</button>
                  </div>
                </div>{" "}
              </div>
              <MaterialReactTable
                columns={columns}
                data={[]}
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
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
