import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";

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

    const url = "http://localhost:8080/test/api/v1/model/filter/";


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
            <div
        style={{
          position: "relative",
          left: "80%",
          zIndex: "2",
          margin: "10px",
        }}
      >
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
        />
        <Table
        heading={["Sr no", "Make","Model", "Status", "Created At", "Action"]}
        list={list}
      />
      
        </Management_container>
    )
}