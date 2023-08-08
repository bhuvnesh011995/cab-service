import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useEffect, useMemo, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";
import * as tiIcons from "react-icons/ti";
import * as rsIcons from "react-icons/rx";
import { MaterialReactTable } from "material-react-table";
import {
  RemoveRedEye,
  Lock,
  ModeEditOutline,
  DeleteForever,
} from "@mui/icons-material/";
import { Box, IconButton } from "@mui/material";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  status: "",
};
export default function RiderManagement() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialState);
  const [list, setList] = useState();

  useEffect(() => {
    fetch(BASE_URL + "/rider/filter/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>{
        let arr = [];
        data?.riders?.map((ele, i) => {
          arr.push({
            index: i + 1,
            firstName: ele.firstName,
            lastName: ele.lastName,
            photo: ele.firstName,
            email: ele.email,
            mobile: ele.mobile,
            wallet: ele.wallet.balance,
            status: ele.status,
            verified:ele.verified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />
          });
        });
        setList(arr);
      }
        // setList(
        //   data.riders.map((ele, i) => {
        //     return (
        //       <tr key={i}>
        //         <td>{i + 1}</td>
        //         <td>{ele.firstName + " " + ele.lastName}</td>
        //         <td>{ele.firstName + " " + ele.lastName}</td>
        //         <td>{ele.email}</td>
        //         <td>{ele.mobile}</td>
        //         <td>{ele.wallet.balance}</td>
        //         <td>{ele.status}</td>
        //         <td>
        //           {ele.varified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />}
        //         </td>
        //         <td>""</td>
        //       </tr>
        //     );
        //   })
        // )
      );
  }, []);


  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "Sr No",
        size: 50,
      },
      {
        accessorKey: "photo",
        header: "Photo",
        size: 20,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'name',
        header: 'Name',
      },
      {
        accessorKey:"email",
        header:"Email",
      },
      {
        accessorKey:"mobile",
        header:"Mobile",
        size:100
      },
      {
        accessorKey:"wallet",
        header:"Wallet",
        size:20
      },
      {
        accessorKey: "status",
        header: "status",
        size: 80,
      },
      {
        accessorKey: "verified",
        header: "Verified",
        size:20
      },
    ],
    []
  );

  function handleClick() {
    navigate("/addRider");
  }

  function handleSubmit() {
    fetch(
      BASE_URL +
        "/rider/filter?name=" +
        filter.name +
        "&email=" +
        filter.email +
        "&mobile=" +
        filter.mobile +
        "&status=" +
        filter.status,
      {
        method: "GET",
      }
    ).then(res=>res.json())
    .then(data=>{
        if(data.success){
          let arr = [];
          data?.riders?.map((ele, i) => {
            arr.push({
              index: i + 1,
              firstname: ele.firstName,
              lastname: ele.lastName,
              photo: ele.firstName,
              email: ele.email,
              mobile: ele.mobile,
              wallet: ele.wallet.balance,
              status: ele.status,
              verified:ele.varified ? <tiIcons.TiTick /> : <rsIcons.RxCross2 />
            });
          });
          setList(arr);
        }
    })
  }

  function reset() {}

  return (
    <Management_container title={"Rider Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add Rider"} />
              </div>
              <form style={{ margin: "50px" }}>
                <div className="row">
                  <div className="col-lg-2 inputField">
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"name"}
                      lebel_text={"Name :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"email"}
                      lebel_text={"Email :"}
                    />
                    <Text_Input
                      input={filter}
                      setInput={setFilter}
                      setKey={"mobile"}
                      lebel_text={"Mobile :"}
                    />
                    <Selection_Input
                      options={["ACTIVE", "INACTIVE"]}
                      input={filter}
                      setInput={setFilter}
                      lebel_text={"Status : "}
                      setKey={"status"}
                    />

                    <div style={{ margin: "20px", marginTop: "50px" }}>
                      <BtnDark handleClick={handleSubmit} title={"Search"} />

                      <BtnDark handleClick={reset} title={"Reset"} />
                    </div>
                  </div>
                </div>
              </form>

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
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
