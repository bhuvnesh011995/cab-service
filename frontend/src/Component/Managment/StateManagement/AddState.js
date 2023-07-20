import { useEffect, useState } from "react"
import Management_container from "../../Common/Management_container"
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";



const url = "http://localhost:8080/test/api/v1/state/"

export default function AddState(){
    const [state,setState] = useState();
    const [options,setOptions] = useState();
    const [successMsg,setSuccessMsg] = useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        fetch("http://localhost:8080/test/api/v1/country/",{
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
            <div className="ml-5 mt-3">
            <form>
                <Selection_Input
                options={options}
                setInput={setState}
                input={state}
                lebel_text={"Country : "}
                setKey={"country"}
                />
                <Text_Input 
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setState}
                />
                <Text_Input 
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
                
            </form>
            </div>
        </Management_container>
    )
}