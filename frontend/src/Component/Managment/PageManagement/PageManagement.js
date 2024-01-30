import Management_container from "../../Common/Management_container";
import { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  clearPageStatus,
  filterPage,
  getPageError,
  getPageStatus,
  getPages,
} from "../../../Redux/features/pageReducer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PageManagement() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const pages = useSelector(getPages);
  const error = useSelector(getPageError);
  const status = useSelector(getPageStatus);

  useEffect(() => {
    if (ready) dispatch(filterPage({}));
    else setReady(true);
  }, [ready]);

  useEffect(() => {
    if (status === "added") {
      toast.success("page added successfully");
      setIsOpen(false);
      dispatch(clearPageStatus());
    } else if (status === "updated") {
      toast.success("page updated successfully");
      dispatch(clearPageStatus);
    } else if (status === "deleted") {
      toast.success("page deleted successfully");
      dispatch(clearPageStatus());
    } else if (status === "error") {
      toast.error(error.message || "some error occured");
      dispatch(clearPageStatus());
    }
  }, [status, error]);

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

  function onSubmit(data) {
    dispatch(filterPage(data));
  }

  return (
    <Management_container title={"Page Management"}>
      {isOpen && <AddNewPage show={isOpen} setShow={setIsOpen} />}
      <div class="row">
        <div class="col-lg-12">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    {...register("search")}
                    className="form-control-md me-3 rounded-pill"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-pill"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <MaterialReactTable
              columns={columns}
              data={pages}
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
          </div>
        </div>
      </div>
    </Management_container>
  );
}
