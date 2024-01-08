import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useLocation } from "react-router-dom";
export default function ModelUpdate(){
    const location = useLocation();
    const data = location.state.model;
  
    const [model, setModel] = useState({
        id: data?.id,
        make: data?.manufacturer,
        name: data?.name,
        status: data?.status,
      });
      

    console.log("dataaa",model)  

    const [options,setOptions]= useState([]);
    const [succMsg,setSuccMsg]=useState("");

    useEffect(()=>{
        fetch(BASE_URL+"/make/",{
            method:"GET"
        }
    ).then(res=>res.json())
    .then(data=>{
        let arr = [];
        data.forEach(ele=>{
            arr.push(ele.name)
        })
        setOptions(arr)
    })
    },[])
        

    return(
        <Management_container
        title={"New Model"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <form>
                <Selection_Input 
                options={options}
                setInput={setModel}
                input={model}
                value={model.make}  
                lebel_text={"Manufacturer : "}
                setKey={"make"}
                />
           <Text_Input 
  lebel_text={"Name : "}
  setKey={"name"}
  value={model.name}
  setInput={setModel}
  onChange={(e) => setModel({ ...model, name: e.target.value })}
/>

                <Selection_Input 
                options={["ACTIVE","INACTIVE"]}
                setInput={setModel}
                input={model}
                lebel_text={"Status : "}
                value = {model.status}
                setKey={"status"}
                />
                <BtnDark
                title={"Add"}
            
                />
                {succMsg}
            </form></div></div></div>
            </div>

        </Management_container>
    )
}