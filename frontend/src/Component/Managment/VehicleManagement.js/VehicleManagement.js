import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Table from "../../Common/Table";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";

let url = "http://localhost:8080/test/api/v1/vehicletype/filter/"

const initialFilter = {
  name:"",
  runMode:""
}

export default function VehicleManagement(){
    const [filter,setFilter] = useState(initialFilter);
    const [options,setOptions] = useState([]);
    const [list, setList] = useState();
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:8080/test/api/v1/runMode/",{
            method:"GET",
        }).then(res=>res.json())
        .then(data=>{
            if (data.success){
                let arr = []
                console.log(data)
                data.data?.map(ele=>arr.push(ele.name))
                setOptions(arr)
            }
        })

        fetch(url,{method:"GET"})
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setList(
                    data.data.map((ele, i) => {
                        let mode = [];
                        ele.runMode?.map(ele=>mode.push(ele.name))
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{ele.name}</td>
                          <td>{mode.join()}</td>
                          <td>{ele.seatingCapacity}</td>
                          <td>{ele.img}</td>
                          <td>{ele.status}</td>
                          <td>""</td>
                        </tr>
                      );
                    })
                  )
            }
        })
    },[])

    function handleClick(e){
        navigate("/addVehicleType")
    }

    function handleSubmit(e){
       fetch(url+"?name="+filter.name+"&runMode="+filter.runMode,{
    method:"GET"
       }).then(res=>res.json())
       .then(data=>{
           if(data.success){
               setList(
                   data.data.map((ele, i) => {
                       let mode = [];
                       ele.runMode?.map(ele=>mode.push(ele.name))
                     return (
                       <tr key={i}>
                         <td>{i + 1}</td>
                         <td>{ele.name}</td>
                         <td>{mode.join()}</td>
                         <td>{ele.seatingCapacity}</td>
                         <td>{ele.img}</td>
                         <td>{ele.status}</td>
                         <td>""</td>
                       </tr>
                     );
                   })
                 )
           }
       })
    }
    function handleClick2(e){
        return
    }

    return(
        <Management_container title={"Vehicle Management"}>
            <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
      <BtnDark handleClick={handleClick} title={"Add New"} /></div>
      <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField" >
        <Text_Input
              input={filter}
              lebel_text={"Name :"}
              setKey={"name"}
              setInput={setFilter}
            />
            <Selection_Input
            options={options}
              input={filter}
              setInput={setFilter}
              lebel_text={"Run Mode : "}
              setKey={"runMode"}
            />
            <div>
                <BtnDark handleClick={handleSubmit} title={"Search"}/>
                <BtnDark handleClick={handleClick2} title={"Reset"}/>
            </div>
        </div>
      </div>
    </form></div></div></div></div>
      <Table
        heading={["Sr no", "Name","Run Mode","Seating Capacity","Image selected", "Status", "Action"]}
        list={list}
      />
        </Management_container>
    )
}