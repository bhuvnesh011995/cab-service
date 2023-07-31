import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";

let initialFilter = {
    make:"",
    name: "",
    status: "",
  };

export default function ModelManagement(){
    const [filter, setFilter] = useState(initialFilter);
    const [list, setList] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(url, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) =>
              setList(
                data.modelList.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{ele.make.name}</td>
                      <td>{ele.name}</td>
                      <td>{ele.status}</td>
                      <td>{ele.createdAt}</td>
                      <td>""</td>
                    </tr>
                  );
                })
              )
            );
    },[])

    const url = BASE_URL+"/model/filter/";


    function handleClick(){
      navigate("/addModel")
    }
    function handleSubmit(e){
        e.preventDefault();
        
        fetch(`${url}?name=${filter.name}&status=${filter.status}&make=${filter.make}`,
        {
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          if(data.success){
            setList(
              data?.modelList.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele.make.name}</td>
                    <td>{ele.name}</td>
                    <td>{ele.status}</td>
                    <td>{ele.createdAt}</td>
                    <td>""</td>
                  </tr>
                );
            })
        )}})
    }
    function handleClick2(){
        
    }


    return(
        <Management_container title={"Model Management"}>
         <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
        <BtnDark handleClick={handleClick} title={"Add Model"} /></div>
        <Filter_Option
        input={filter}
        setInput={setFilter}
        initialInput={initialFilter}
        btn1_title={"Search"}
        handleClick1={handleSubmit}
        handleClick2={handleClick2}
        btn2_title={"reset"}
        options={["name","status","make"]}
        /></div></div></div></div>
        <Table
        heading={["Sr no", "Make","Model", "Status", "Created At", "Action"]}
        list={list}
      />
      
        </Management_container>
    )
}