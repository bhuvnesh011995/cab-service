import { useEffect, useState } from "react";
import "./AdminManagement.css";
import Table from "../Common/Table";
import Management_container from "../Common/Management_container";
import Filter_Option from "../Common/Filter_option";
import BtnDark from "../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/config"
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
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) =>
        setList(
          data?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.username}</td>
                <td>{ele.status}</td>
                <td>{ele.createdAt}</td>
                <td>""</td>
              </tr>
            );
          })
        )
      );
  }, []);

 

  function handleClick(e){
    e.preventDefault();
    navigate("/signUp")
  }

  function handleClick2(e){
    e.preventDefault()
    setFilter(initialFilter)
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
      .then((data) =>
        setList(
          data?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.username}</td>
                <td>{ele.status}</td>
                <td>{ele.createdAt}</td>
                <td>""</td>
              </tr>
            );
          })
        )
      );
  }

  return (
    <Management_container
    title={"Admin Users"}>
<div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
      <BtnDark handleClick={handleClick}
      title={"Add Admin"}
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
        options={["name","username","status","from","to"]}
      />
      </div></div></div></div>
      <div class="row">
      <Table
        heading={[
          "Sr no",
          "Name",
          "Username",
          "status",
          "created At",
          "Action",
        ]}
        list={list}
      />
      </div>
    </Management_container>
  );
}
