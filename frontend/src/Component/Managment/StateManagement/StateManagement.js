import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";

const initialFilter = {
    name:"",
    country:"",
    status:""
}

export default function StateManagement (){
    const [filter,setFilter]  = useState(initialFilter);
    const [list,setList] = useState();
    const navigate = useNavigate();
    const url = BASE_URL+"/state/filter/";

    useEffect(() => {
        fetch(url, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) =>
            setList(
              data.stateList.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.stateCode}</td>
                    <td>{ele.country}</td>
                    <td>{ele.status}</td>
                    <td>{ele.createdAt}</td>
                    <td>""</td>
                  </tr>
                );
              })
            )
          );
      }, []);



    function handleClick(){
        navigate("/addState")
    }

    function handleSubmit(){
        fetch(`${url}?name=${filter.name}&country=${filter.country}&status=${filter.status}`,{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>
          setList(
            data?.stateList?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                    <td>{ele.stateCode}</td>
                    <td>{ele.country}</td>
                    <td>{ele.status}</td>
                    <td>{ele.createdAt}</td>
                  <td>""</td>
                </tr>
              );
            })
          )
        );
    }
    function handleClick2(){
            setFilter(initialFilter)
    }

    return(
        <Management_container title={"STATE MANAGEMENT"}>
         <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
            <BtnDark handleClick={handleClick} title={"Add State"} />
        </div>
        <Filter_Option 
            input={filter}
            setInput={setFilter}
            initialInput={initialFilter}
            btn1_title={"Search"}
            handleClick1={handleSubmit}
            handleClick2={handleClick2}
            btn2_title={"reset"}
            options={["name","status","country"]}
            /></div></div></div></div>
            <Table
            heading={["Sr no", "Name","State Code","Country", "Status", "Created At", "Action"]}
            list={list}
            />
        </Management_container>
    )
}