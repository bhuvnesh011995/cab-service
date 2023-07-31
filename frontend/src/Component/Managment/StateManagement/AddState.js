import { useEffect, useState } from "react"
import Management_container from "../../Common/Management_container"
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";


let initialState = {
    country:"",
    name:"",
    status:"",
    stateCode:"",
}
const url = BASE_URL+"/state/"

export default function AddState(){
    const [state,setState] = useState(initialState);
    const [options,setOptions] = useState();
    const [successMsg,setSuccessMsg] = useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        fetch(BASE_URL+"/country/",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        let arr = [];
        data.forEach(ele=>arr.push(ele.name))
        setOptions(arr)
      }
      )
    },[])

    function handleSubmit(e){
        e.preventDefault();
        fetch(url,{
            method:"POST",
            body:JSON.stringify(state),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        }).then(res=>res.json())
        .then(data=>{
            if(data.success) setSuccessMsg(
                <div style={{backgroundColor:"lightgreen"}}>{data.message}</div>
            )
            else setSuccessMsg(
                <div style={{backgroundColor:"red"}}>{data.message}</div>
            )
        })
        .catch(e=>
            setSuccessMsg(<div style={{backgroundColor:"red"}}>{e.message}</div>))
    }
    return(
        <Management_container title={"Add State"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <form>
                <Selection_Input
                options={options}
                setInput={setState}
                input={state}
                lebel_text={"Country : "}
                setKey={"country"}
                />
                <Text_Input 
                input={state}
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setState}
                />
                <Text_Input 
                input={state}
                lebel_text={"State Code : "}
                setKey={"stateCode"}
                setInput={setState}
                />
                <Selection_Input
                options={["ACTIVE","INACTIVE"]}
                setInput={setState}
                input={state}
                lebel_text={"Status : "}
                setKey={"status"}
                />
                <div>
                   <BtnDark
                title={"Add"}
                handleClick={handleSubmit}
                />
                {successMsg} 
                </div>
                
            </form></div></div></div>
            </div>
        </Management_container>
    )
}