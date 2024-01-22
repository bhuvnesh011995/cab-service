import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";

import { useEffect, useMemo, useState } from "react";
import BASE_URL from "../../../config/config";
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
import DeleteModal from "../../DeleteModel/DeleteModel";
import { useDispatch, useSelector } from "react-redux";
import { filterCities, getCities } from "../../../Redux/features/cityReducer";
import moment from "moment/moment";
import { useForm } from "react-hook-form";
const initialFilter = {
  text: "",
};

export default function CityManagement() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const [polygons, setPolygons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const { register, watch, handleSubmit } = useForm();

  let url = BASE_URL + "/city/";

  useEffect(() => {
    if (ready) {
      dispatch(filterCities({ text: "" }));
    } else setReady(true);
  }, [ready]);

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

  function handleClick() {
    navigate("/addCity");
  }

  const territories = useMemo(
    () => cities.map((city) => city.territory),
    [cities]
  );

  function onSubmit(data) {
    dispatch(filterCities(data));
  }

  function handleDelete(rowId) {
    const deleteUrl = BASE_URL + "/city/" + rowId;

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          const filterList = list.filter((item) => item.id !== rowId);
          setList(filterList);
          setIsOpen(false);
          return response.json();
        }
      })
      .then((data) => {
        if (data.success) toast.success(data.message);
        else toast.success(data.message);
      })
      .catch((error) => {
        console.error("Error occurred while deleting:", error);
      });
  }

  function updateMap(id) {
    let data = {};
    polygons.map((ele) => {
      if (ele._id === id) {
        data.area = ele.area;
      }
    });
    fetch(BASE_URL + "/city/map/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setList((preVal) =>
            preVal.map((ele) => {
              if (ele._id === id) {
                ele.update = false;
              }
              return ele;
            })
          );
        }
      });
  }

  return (
    <Management_container title={"City Management"}>
      <MapService
        setData={setList}
        polygon={polygons}
        setPolygon={setPolygons}
      />

      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <DeleteModal
              info={deleteInfo}
              show={isOpen}
              setShow={setIsOpen}
              handleDelete={handleDelete}
              arg={id}
            />
            <div class="card-body">
              <div className="text-right">
                <button onClick={handleClick} className="btn btn-primary">
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
        renderRowActions={({ row, table }) =>
          !row.original.update ? (
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
              <IconButton
                onClick={() => {
                  setDeleteInfo({
                    message: `Do You Really Want To Delete ${row.original?.name}`,
                    header: "Delete Model",
                  });
                  setIsOpen(true);
                  setId(row.original.id);
                }}
              >
                <DeleteForever />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <button
                className="m-1"
                onClick={() => updateMap(row.original._id)}
              >
                Update Map
              </button>
              <button
                className="m-1"
                onClick={() => dispatch(filterCities({ text: watch("text") }))}
              >
                cancel
              </button>
            </Box>
          )
        }
      />
    </Management_container>
  );
}
