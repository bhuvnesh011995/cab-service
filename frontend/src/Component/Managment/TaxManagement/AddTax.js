import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Number_Input from "../../Common/Inputs/Number_Input";
import Text_Input from "../../Common/Inputs/Text_Input";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { useNavigate } from "react-router-dom";

const initialTax = {
    title:"",
    status:"",
    value:0,
    taxType:""
}
export default function AddTax() {
    const [tax,setTax] = useState(initialTax)
    const navigate = useNavigate()


    function handleSubmit(){
        fetch(BASE_URL+"/tax/",{
            method:"POST",
            body:JSON.stringify(tax),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                navigate(-1)
            }
        })
    }
    return(
        <Management_container title={"Add Tax"}>
        <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <form className="w-100">
                <Text_Input
                  input={tax}
                  setInput={setTax}
                  lebel_text={"Title"}
                  setKey={"title"}
                />

                <Number_Input
                input={tax}
                setInput={setTax}
                setKey={"value"}
                lebel_text={"Value(%)"}
                />

                <Text_Input
                input={tax}
                setInput={setTax}
                setKey={"taxType"}
                lebel_text={"Tax Type :"}
                />
                    
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={tax}
                  setInput={setTax}
                  setKey={"status"}
                  lebel_text={"Status :"}
                />

                
                <BtnDark handleClick={handleSubmit} title={"Add Tax"} />
              </form>
            </div>
          </div>
        </div>
      </div>
        </Management_container>
    )
};
