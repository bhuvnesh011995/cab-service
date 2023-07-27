import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useEffect, useState } from "react";
import Filter_Option from "../../Common/Filter_option";

const initialFilter = {
  country:"",
  state:"",
  city:"",
  vehicleType:"",
  status:""
}
const url = "http://localhost:8080/test/api/v1/individualFare/"
export default function IndividualFareManagement(){
    const [list,setList] = useState();
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter)

    useEffect(()=>{
        fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) =>{
      
      if(data.success){
        setList(
          data?.allIndiFare?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.country.name}</td>
                <td>{ele.state?.name || "NA"}</td>
                <td>{ele.city?.name || "NA"}</td>
                <td>{ele.vehicleType?.name || "NA"}</td>
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
    function handleClick(){
        navigate("/addIndividualFare")
    }

    function handleSubmit(e){
     
      e.preventDefault();
       console.log("hiiii")
      fetch(`${url}?country=${
        filter.country+"&state="+
        filter.state+"&city="+
        filter.city+"&vehicleType="+
        filter.vehicleType+"&status="+
        filter.status
      }`,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        console.log(data.allIndiFare)
        if(data.success){
          setList(
            data?.allIndiFare?.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.country.name}</td>
                  <td>{ele.state?.name || "NA"}</td>
                  <td>{ele.city?.name || "NA"}</td>
                  <td>{ele.vehicleType?.name || "NA"}</td>
                  <td>{ele.status}</td>
                  <td>{ele.createdAt || "NA"}</td>
                  <td>""</td>
                </tr>
              );
            })
          )
        }
      })

    }

    function handleClick2(){

    }
    return(
        <Management_container title={"Individual Fare Management"}>
            <div style={{position:"relative",left:"80%",zIndex:"2",margin:"10px"}}>
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
        options={["country","state","city","status","vehicleType"]}
        />


        <Table
        heading={[
          "Sr no",
          "Country",
          "State",
          "City",
          "Vehicle Type",
          "status",
          "created At",
          "Action",
        ]}
        list={list}
      />
        </Management_container>
    )
}