import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import MapService from "./MapService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  cityStatus,
  clearCityStatus,
  filterCities,
  getCities,
} from "../../../Redux/features/cityReducer";
import moment from "moment/moment";
import { useForm } from "react-hook-form";
import { AddNewCity } from "./AddCity";

export default function CityManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const { register, watch, handleSubmit } = useForm();
  const status = useSelector(cityStatus);
  useEffect(() => {
    if (ready) {
      dispatch(filterCities({ text: "" }));
    } else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "added") {
      toast.success("city added");
      setIsOpen(false);
      dispatch(clearCityStatus());
    }
  }, [status]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorFn: (row) => row.state?.name,
        id: "state",
        header: "State",
        size: 100,
      },
      {
        accessorFn: (row) => row.country?.name,
        id: "country",
        header: "Country",
      },
      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
      {
        accessorFn: (row) => moment(row.createdAt)?.format("ll"),
        id: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  function onSubmit(data) {
    dispatch(filterCities(data));
  }

  return (
    <Management_container title={"City Management"}>
      {isOpen && <AddNewCity show={isOpen} setShow={setIsOpen} />}
      <MapService />

      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div className="text-right">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn btn-primary"
                >
                  Add City
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    {...register("text")}
                    className="form-control-lg me-3 rounded-pill"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary rounded-pill"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MaterialReactTable
        columns={columns}
        data={cities}
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
            <IconButton onClick={() => {}}>
              <DeleteForever />
            </IconButton>
          </Box>
        )}
      />
    </Management_container>
  );
}
