import { useEffect, useState } from "react";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
let initialFilter = {
  name: "",
  status: "",
};
export default function MakeManagement() {
  const [filter, setFilter] = useState(initialFilter);
  const [list, setList] = useState();
  const navigate = useNavigate();
  const url = "http://localhost:8080/test/api/v1/make/filter/";
  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        setList(
          data.makeList.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.status}</td>
                <td>{ele.createdAt}</td>
                <td>""</td>
              </tr>
            );
          })
        )
      );
  }, []);

  function handleClick(e) {
    e.preventDefault();
    navigate("/addMake");
  }


 function handleClick2(e){
    e.preventDefault()
    setFilter(initialFilter)
return  
}
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}?name=${filter.name}&status=${filter.status}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        setList(
          data?.makeList?.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.name}</td>
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
    <Management_container title={"Make Management"}>
        <div
        style={{
          position: "relative",
          left: "80%",
          zIndex: "2",
          margin: "10px",
        }}
      >
        <BtnDark handleClick={handleClick} title={"Add Make"} />
      </div>
      <Filter_Option 
      input={filter}
      setInput={setFilter}
      initialInput={initialFilter}
      btn1_title={"Search"}
      handleClick1={handleSubmit}
      handleClick2={handleClick2}
      btn2_title={"reset"}
      options={["name","status"]}
      />

      <Table
        heading={["Sr no", "Name", "Status", "Created At", "Action"]}
        list={list}
      />
      
    </Management_container>
  );
}
