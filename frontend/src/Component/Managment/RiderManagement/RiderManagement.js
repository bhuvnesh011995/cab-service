import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Table from "../../Common/Table";


const initialState = {
    name:"",
    email:"",
    phone:"",
    status:""
}
export default function RiderManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialState);

    function handleClick(){
        navigate("/addRider")
    }


    function handleSubmit(){

    }

    function reset(){

    }


    return(
        <Management_container title={"Rider Management"}>
            <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
        <BtnDark handleClick={handleClick} title={"Add Model"} /></div>
        <form style={{margin:"50px"}}>
      <div className="row">
        <div className="col-lg-2 inputField" >
            <Text_Input input={filter}
            setInput={setFilter}
            setKey={"name"} 
            lebel_text={"Name :"}
            />
            <Text_Input
            input={filter}
            setInput={setFilter}
            setKey={"email"} 
            lebel_text={"Email :"}
            />
            <Text_Input
            input={filter}
            setInput={setFilter}
            setKey={"phone"} 
            lebel_text={"Phone :"}
            />
            <Selection_Input
            options={["ACTIVE","INACTIVE"]}
            input={filter}
            setInput={setFilter}
            lebel_text={"Status : "}
            setKey={"status"}
            />

            <div style={{margin:"20px", marginTop:"50px"}}>
            <BtnDark handleClick={handleSubmit} title={"Search"}/>
          
            <BtnDark handleClick={reset} title={"Reset"}/>
        </div>
            
            </div></div></form>

            <Table 
            heading={["Sr No","Photo","Name","Email","Phone","Wallet","Status","Varified","Action"]}
            />

        </div></div></div></div>
        </Management_container>
    )
}