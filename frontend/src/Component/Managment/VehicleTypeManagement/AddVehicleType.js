import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";

let initialInput = {
    img:"http://img.url.com",
    name:"",
    runModes:[],
    seatingCapacityName:"",
    seatingCapacity:null,
    status:""
}

let url = BASE_URL+"/vehicletype/"
export default function AddVehicleType() {

    const [vehicletype,setVehicleType] = useState(initialInput)
    const [options,setOptions] = useState();
    const [successMsg,setSuccessMsg]= useState();

    useEffect(()=>{
        fetch(BASE_URL+"/runMode/",{
            method:"GET",
        }).then(res=>res.json())
        .then(data=>{
            if (data.success){
                let arr = []
                data.data?.map(ele=>arr.push(ele.name))
                setOptions(arr)
            }
        })
    },[])

    let optionList = options?.map((ele,i)=>{
        return(
          <option key={i} value={ele}>{ele.toLowerCase()}</option>
        )
      })

      function handleChange(e){
        e.preventDefault();
        let value = [];
        for(let i=0;i<e.target.options.length;i++){
            if(e.target.options[i].selected){
                value.push(e.target.options[i].value)
            }
        }
        setVehicleType(preVal=>({...preVal,runModes:value}))
      }


      function handleSubmit(e){
        e.preventDefault();

        fetch(url,{
            method:"POST",
            body:JSON.stringify(vehicletype),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success) setSuccessMsg(
                <span style={{backgroundColor:"lightgreen"}}>{data.message}</span>
            )
            else setSuccessMsg(
                <span style={{backgroundColor:"red"}}>{data.message}</span>
            )
        })
        .catch(e=>
            setSuccessMsg(<h4 style={{backgroundColor:"red"}}>{e.message}</h4>))
      }


  return (
    <Management_container title={"Add Vehicle Type"}>
         <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <form>
      <div className="col-sm-6">
        <div className="mt-4">
          <div>
            <label for="formFileSm" className="form-label">
                select an image
            </label>
            <input
              className="form-control form-control-sm"
              type="file"
            />
          </div>
        </div>
      </div>
      <Text_Input 
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setVehicleType}
                />
                
            <div className="d-flex align-items-center m-3">
      <label className="form-label">Run Mode : </label>
      <select
        name="selectedStatus"
        defaultValue={""}
        multiple={true}
        onChange={(e) =>handleChange(e)}>
        {optionList}
        </select>
    </div>
    <Text_Input 
                lebel_text={"Seating Name : "}
                setKey={"seatingCapacityName"}
                setInput={setVehicleType}
                />
            <div>
                <label >Seating Capacity</label>
                <input onChange={e=>setVehicleType(preVal=>({...preVal,seatingCapacity:e.target.value}))} type="number"  placeholder="Enter Number" />
            </div>
                 <Selection_Input
                options={["ACTIVE","INACTIVE"]}
                setInput={setVehicleType}
                input={vehicletype}
                lebel_text={"Status : "}
                setKey={"status"}
                />
                <BtnDark
                title={"Add"}
                handleClick={handleSubmit}
                />
                {successMsg}
                </form></div></div></div>
    </div>
    </Management_container>
  );
}
