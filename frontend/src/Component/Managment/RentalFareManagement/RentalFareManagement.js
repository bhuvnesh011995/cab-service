import { useEffect, useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Filter_Option from "../../Common/Filter_option";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useNavigate } from "react-router-dom";

const initialFilter = {
    package:"",
    country:"",
    state:"",
    city:"",
    vehicleType:"",
    status:""
  }
const url = "http://localhost:8080/test/api/v1/rentalFare/"
export default function RentalPackageManagement(){
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

    }

    function handleClick(e){
        e.preventDefault();
        
    }

    function handleClick2(e){
        e.preventDefault();
        
    }

    return(
        <Management_container title={"Rental Fare Management"}>
            <div
        style={{
          position: "relative",
          left: "80%",
          zIndex: "2",
          margin: "10px",
        }}
      >
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
        />
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