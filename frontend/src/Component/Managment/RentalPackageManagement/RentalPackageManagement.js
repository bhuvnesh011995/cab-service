import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import Table from "../../Common/Table";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";


const initialFilter = {
    name:"",
    status:""
}
const url = BASE_URL+"/rentalPackage/filter/"
export default function RentalPackageManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const navigate = useNavigate();
    const [list,setList] = useState();

    useEffect(()=>{
        fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) =>{
        
        if(data.success){
          setList(
            data?.packages?.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.maxDuration || "NA"}</td>
                  <td>{ele.maxDistance.$numberDecimal || "NA"}</td>
                  <td>{ele.status}</td>
                  <td>{ele.createdAt || "NA"}</td>
                  <td>""</td>
                </tr>
              );
            })
          )
        }
          
      }
        );
    },[])

    function handleClick(e){
        e.preventDefault();
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleClick2(e){
        e.preventDefault();
    }


    return(
        <Management_container title={"Rental Package Management"}>
           <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
               <BtnDark handleClick={handleClick}
            title={"Add New"}
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
        options={["name","status"]}
        /></div></div></div></div>

        <Table 
        heading={[
            "Sr no",
            "Name",
            "Max Duration(in hr)",
            "Max Distance(in KM)",
            "status",
            "created At",
            "Action",
          ]}
          list={list}
          />

        </Management_container>
    )
}