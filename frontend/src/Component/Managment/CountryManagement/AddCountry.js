import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";

const initialState = {
    name:"",
    countryCode:"",
    dialCode:"",
    status:""
}
export default function Addcountry(){
    const [country,setCountry] = useState(initialState)
    const [successMsg,setSuccessMsg] = useState();

    const url =BASE_URL+"/country/"
    function handleSubmit(){
        fetch(url,{
            method:"POST",
            body:JSON.stringify(country),
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
    }
    return(
        <Management_container
        title={"Add Country"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">

            <form>
            <Text_Input 
                input={country}
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setCountry}
                />
                <Text_Input 
                input={country}
                lebel_text={"Country Code : "}
                setKey={"countryCode"}
                setInput={setCountry}
                />
                <Text_Input
                input={country}
                lebel_text={"Dial Code : "}
                setKey={"dialCode"}
                setInput={setCountry}
                />
                <Selection_Input
                options={["ACTIVE","INACTIVE"]}
                setInput={setCountry}
                input={country}
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