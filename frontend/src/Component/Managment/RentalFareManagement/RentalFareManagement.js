import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";

const initialFilter = {
    package:"",
    country:"",
    state:"",
    city:"",
    vehicleType:"",
    status:""
  }
const url = BASE_URL+"/rentalFare/"
export default function RentalFareManagement(){
    const [list,setList] = useState();
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter)

    useEffect(()=>{
        fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) =>{
      if(data.success){
        setList(
          data?.allRentalFare?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.country.name}</td>
                <td>{ele.state?.name || "NA"}</td>
                <td>{ele.city?.name || "NA"}</td>
                <td>{ele.package[0]?.packageId?.name}</td>
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


    function handleSubmit(e){
        e.preventDefault();
        fetch(url+"?country="+filter.country+"&state="+filter.state+"&city="+filter.city+"&status="+filter.status+"&vehicleType="+filter.vehicleType
          ,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.success){
            setList(
              data?.allRentalFare?.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.country.name}</td>
                    <td>{ele.state?.name || "NA"}</td>
                    <td>{ele.city?.name || "NA"}</td>
                    <td>{ele.package[0]?.packageId?.name}</td>
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

    function handleClick(e){
        e.preventDefault();
        navigate("/addRentalFare")
    }

    function handleClick2(e){
        e.preventDefault();
        
    }

    return(
        <Management_container title={"Rental Fare Management"}>
          <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
        <BtnDark handleClick={handleClick} title={"Add Fare"} /></div>

        <Filter_Option
        input={filter}
        setInput={setFilter}
        initialInput={initialFilter}
        btn1_title={"Search"}
        handleClick1={handleSubmit}
        handleClick2={handleClick2}
        btn2_title={"reset"}
        options={["country","state","city","status","vehicleType"]}
        /></div></div></div></div>
        <Table
        heading={[
          "Sr no",
          "Country",
          "State",
          "City",
          "Package Name",
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