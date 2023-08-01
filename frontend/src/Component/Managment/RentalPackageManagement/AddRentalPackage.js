import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";

const initialState = {
    name:"",
    maxDuration: "8 hr",
    maxDistance:80,
    status:""
}

let url = BASE_URL+"/rentalPackage/"
export default function AddRentalPackage(){
    const [rentalPackage,setPackage] = useState(initialState)
    const [succMsg,setSuccMsg] = useState();

    function handleSubmit(e){
        e.preventDefault();

        fetch(url,{
            method:"POST",
            body:JSON.stringify(rentalPackage),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                setSuccMsg(<span style={{backgroundColor:"lightgreen"}}>{data.message}</span>)
            }else{
                setSuccMsg(<span style={{backgroundColor:"red"}}>{data.message}</span>)
            }
        })
    }


    return(
        <Management_container title={"Add Package"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <form>
            <Text_Input
            lebel_text={"Name : "}
            setKey={"name"}
            setInput={setPackage} />
            <Text_Input
            lebel_text={"Max Duration : "}
            setKey={"maxDuration"}
            setInput={setPackage} />
            <Text_Input
            type={"number"}
            lebel_text={"Max Distance : "}
            setKey={"maxDistance"}
            setInput={setPackage} />
            <Selection_Input 
            input={rentalPackage}
            setInput={setPackage}
            setKey={"status"}
            options={["ACTIVE","INACTIVE"]}
            />
            <BtnDark  title={"Add"}
                handleClick={handleSubmit}
                />
                {succMsg}
            </form>
            </div></div></div></div>
        </Management_container>
    )
}