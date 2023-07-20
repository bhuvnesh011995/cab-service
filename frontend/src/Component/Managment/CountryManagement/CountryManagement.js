import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";


let initialFilter = {
    name:"",
    status:""
}
export default function CountryManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();
    const navigate = useNavigate();
    const url = "http://localhost:8080/test/api/v1/country/filter/";

    useEffect(()=>{
        fetch(url,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>setList(
            data?.countryList?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.countryCode}</td>
                  <td>{ele.dialCode}</td>
                  <td>{ele.status}</td>
                  <td>{ele.createAt || ele.createdAt}</td>
                  <td>""</td>
                </tr>
              );
            })
          ))
    },[])

    function handleClick(){
        navigate("/addCountry")
    }
    function handleSubmit(){
        fetch(`${url}?name=${filter.name}&status=${filter.status}`,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>setList(
             data?.countryList?.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.countryCode}</td>
                  <td>{ele.dialCode}</td>
                  <td>{ele.status}</td>
                  <td>{ele.createAt || ele.createdAt}</td>
                  <td>""</td>
                </tr>
              );
            })
        ))
    }
    function handleClick2(){
        setFilter(initialFilter)
    }

    return(
        <Management_container
        title={"Country Management"}
        >
        <div
        style={{
          position: "relative",
          left: "80%",
          zIndex: "2",
          margin: "10px",
        }}
        >
            <BtnDark handleClick={handleClick} title={"Add Country"} />
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
            heading={["Sr no", "Name","Country Code","Dial Code", "Status", "Created At", "Action"]}
            list={list}
       />


        </Management_container>
    )
}