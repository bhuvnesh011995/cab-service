import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";

export default function AddModel (){
    const [model,setModel] = useState({
        name:"",
        make:"",
        status:""
    });
    const [options,setOptions]= useState([]);
    const [succMsg,setSuccMsg]=useState("");

    useEffect(()=>{
        fetch("http://localhost:8080/test/api/v1/make/",{
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
    const url = "http://localhost:8080/test/api/v1/model/"
    function handleSubmit(e){
        fetch(url,{
            method:"POST",
            body:JSON.stringify(model),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
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
        <Management_container
        title={"New Model"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
            <forn>
                <Selection_Input 
                options={options}
                setInput={setModel}
                input={model}
                lebel_text={"Make : "}
                setKey={"make"}
                />
             <Text_Input 
                lebel_text={"Name : "}
                setKey={"name"}
                setInput={setModel}
                />

                <Selection_Input 
                options={["ACTIVE","INACTIVE"]}
                setInput={setModel}
                input={model}
                lebel_text={"Status : "}
                setKey={"status"}
                />
                <BtnDark
                title={"Add"}
                handleClick={handleSubmit}
                />
                {succMsg}
            </forn></div></div></div>
            </div>

        </Management_container>
    )
}