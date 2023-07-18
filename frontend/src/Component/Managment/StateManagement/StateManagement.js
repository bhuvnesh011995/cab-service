import { useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";

const initialFilter = {
    name:"",
    country:"",
    status:""
}

export default function StateManagement (){
    const [filter,setFilter]  = useState();
    const [list,setList] = useState();
    const navigate = useNavigate();
    const url = "http://localhost:8080/test/api/v1/state/filter/";



    function handleClick(){
        navigate("/addState")
    }

    function handleSubmit(){
        return
    }
    function handleClick2(){
            setFilter(initialFilter)
    }

    return(
        <Management_container title={"STATE MANAGEMENT"}>
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
            options={["name","status","country"]}
            />
            <Table
            heading={["Sr no", "Name","State Code","Country", "Status", "Created At", "Action"]}
            list={list}
            />
        </Management_container>
    )
}