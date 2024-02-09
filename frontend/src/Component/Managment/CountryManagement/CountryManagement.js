import { useEffect, useMemo, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";
import { MaterialReactTable } from "material-react-table";

import { toast } from "react-toastify";
import AddCountry from "./AddCountry";

import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCountryStatus,
  clearStatus,
  deleteCountry,
  error,
  filterCountries,
  getCountries,
  status,
  updateCountry,
} from "../../../Redux/features/countryReducer";
import {
  closeModal,
  status as deleteModalStatus,
  url,
  openModal,
  showDeleteModal,
  doneDelete,
} from "../../../Redux/features/deleteModalReducer";
import DeleteModalAdv from "../../../Common/deleteModalRedux";

let initialFilter = {
  name: "",
  status: "",
};
export default function CountryManagement() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  const contries = useSelector(getCountries);
  const countryStatus = useSelector(status);
  const countryError = useSelector(error);
  const show = useSelector(showDeleteModal);
  const [isOpen, setIsOpen] = useState(false);
  const deleteStatus = useSelector(deleteModalStatus);
  const id = useSelector((state) => state.delete.id);
  const URL = useSelector(url);
  useEffect(() => {
    if (ready) {
      dispatch(filterCountries(filter));
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (countryStatus === "updated") {
      toast.success(countryError?.message || "country Updated successfully");
      dispatch(clearCountryStatus());
      setIsOpen(false);
    } else if (countryStatus === "error") {
      toast.error(countryError?.message || "some error occured");
      dispatch(clearCountryStatus());
    } else if (countryStatus === "added") {
      toast.success("country added successfully");
      dispatch(clearCountryStatus());
      setIsOpen(false);
    } else if (countryStatus === "deleted") {
      toast.success("country deleted successfully");
      dispatch(clearCountryStatus());
      dispatch(closeModal());
    } else if (countryStatus === "error") {
      toast.error(error.message || "some error occured");
    }
  }, [countryStatus, error]);

  useEffect(() => {
    if (deleteStatus === "delete") {
      dispatch(deleteCountry({ url: URL, id }));
      dispatch(doneDelete());
    }
  }, [deleteStatus, URL, id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "countryCode",
        header: "Country Code",
        size: 50,
      },
      {
        accessorKey: "dialCode",
        header: "Dial Code",
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
      },
    ],
    [],
  );
  function handleSubmit() {
    dispatch(filterCountries(filter));
  }

  function handleClick2() {
    setFilter(initialFilter);
  }

  return (
    <Management_container title={"Country Management"}>
      <div class='row'>
        <div class='col-lg-13'>
          <div class='card'>
            {show && <DeleteModalAdv />}
            {isOpen && <AddCountry show={isOpen} setShow={setIsOpen} />}

            <div class='card-body'>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <button
                  className='btn btn-outline-primary'
                  onClick={() => setIsOpen(true)}
                >
                  Add Country
                </button>
              </div>
              <Filter_Option
                input={filter}
                setInput={setFilter}
                initialInput={initialFilter}
                btn1_title={"Search"}
                handleClick1={handleSubmit}
                handleClick2={handleClick2}
                btn2_title={"reset"}
                options={["name", "status"]}
              />
            </div>
          </div>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={contries}
        enableRowNumbers
        rowNumberMode='static'
        enableRowActions
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableColumnActions={false}
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
              onClick={() => {
                dispatch(updateCountry({ id: row.original._id }));
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
                    url: `${BASE_URL}/country/${row.original._id}`,
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
    </Management_container>
  );
}
