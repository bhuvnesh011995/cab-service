import { useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";


const url = BASE_URL+'/make/'
export default function AddMake(){
    const [make,setMake] = useState({

    });
    const [successMsg,setSuccessMsg] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        fetch(url,{
            method:"POST",
            body:JSON.stringify(make),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        })
        .then(res=>res.json())
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


    return(
        <Management_container
        title={"New Make"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <form>
                <Text_Input 
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setMake}
                />
                <Selection_Input
                options={["ACTIVE","INACTIVE"]}
                setInput={setMake}
                input={make}
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
        
    )
}