import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./AdminManagement.css";
import Table from "../Common/Table";
import Management_container from "../Common/Management_container";
import Filter_Option from "../Common/Filter_option";
import BtnDark from "../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/config";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import useDebounce from "../../Custom Hook/debounce";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  let fetchSize = 10;
  let arr = useMemo(() => [globalFilter, sorting], [globalFilter, sorting]);
  // const queryKey = useDebounce(arr, 1500);
  const tableContainerRef = useRef(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef = useRef(null);

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [sorting, globalFilter, "table-data"],
      queryFn: async ({ pageParam }) => {
        let url = new URL("/test/api/v1/admins", BASE_URL);
        url.searchParams.set("start", `${pageParam * fetchSize}`);
        url.searchParams.set("size", `${fetchSize}`);
        url.searchParams.set("globelFilter", globalFilter);
        url.searchParams.set("sort", JSON.stringify(sorting));
        console.log(url.href, "hello");
        try {
          const response = await axios.get(url.href);
          console.log(response, "hellllooo");
          return response;
        } catch (error) {
          console.log(error.response, "hellooo");
        }
      },
      initialPageParam: 0,
      getNextPageParam: (_lastGroup, groups) => groups.length,
      refetchOnWindowFocus: false,
    });
  console.log(data, "jiii");
  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data?.data) ?? [],
    [data]
  );

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (data) => {
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
  let totalDBRowCount = data?.pages[0]?.data?.total;
  let totalFetched = flatData?.length;
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );
  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, globalFilter]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef?.current);
  }, [fetchMoreOnBottomReached]);

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
        accessorFn: (row) => row.createdAt?.slice(0, 10),
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
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/addAdmin")}
                >
                  Add New
                </button>
              </div>

              {/* <MaterialReactTable
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
                data={flatData || []}
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
                enableRowVirtualization={true}
                manualFiltering={true}
                manualSorting={true}
                muiTableContainerProps={{
                  ref: tableContainerRef, //get access to the table container element
                  sx: { maxHeight: "600px" }, //give the table a max height
                  onScroll: (event) => fetchMoreOnBottomReached(event.target), //add an event listener to the table container element
                }}
                muiToolbarAlertBannerProps={
                  isError
                    ? {
                        color: "error",
                        children: "Error loading data",
                      }
                    : undefined
                }
                onGlobalFilterChange={setGlobalFilter}
                onSortingChange={setSorting}
                renderBottomToolbarCustomActions={() => (
                  <Typography>
                    Fetched {totalFetched} of {totalDBRowCount} total rows.
                  </Typography>
                )}
                state={{
                  globalFilter,
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
                }}
                rowVirtualizerInstanceRef //get access to the virtualizer instance
                rowVirtualizerOptions={{ overscan: 4 }}
              /> */}
              <MaterialReactTable
                columns={columns}
                data={flatData}
                enablePagination={false}
                enableRowNumbers
                enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
                manualFiltering
                manualSorting
                muiTableContainerProps={{
                  ref: tableContainerRef, //get access to the table container element
                  sx: { maxHeight: "600px" }, //give the table a max height
                  onScroll: (
                    event //add an event listener to the table container element
                  ) => fetchMoreOnBottomReached(event.target),
                }}
                muiToolbarAlertBannerProps={
                  isError
                    ? {
                        color: "error",
                        children: "Error loading data",
                      }
                    : undefined
                }
                onGlobalFilterChange={setGlobalFilter}
                onSortingChange={setSorting}
                renderBottomToolbarCustomActions={() => (
                  <Typography>
                    Fetched {totalFetched} of {totalDBRowCount} total rows.
                  </Typography>
                )}
                state={{
                  globalFilter,
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
                }}
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                rowVirtualizerProps={{ overscan: 4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
