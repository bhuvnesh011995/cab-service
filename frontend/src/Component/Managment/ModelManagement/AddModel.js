import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function AddModel ({show,setShow}){
    const [model,setModel] = useState({
        name:"",
        make:"",
        status:""
    });
    const [options,setOptions]= useState([]);
    const [succMsg,setSuccMsg]=useState("");
    const navigate = useNavigate()  
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
    
    const url = BASE_URL+"/model/"
    function handleSubmit(e){
        e.preventDefault();
        fetch(url,{
            method:"POST",
            body:JSON.stringify(model),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
               toast.success("add successfully ")  
               setShow(false)
            }else{
                toast.error("error")
            }
        })
    }

    return(
        <Modal size="" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New  Model</Modal.Title>
        </Modal.Header>
    
        <Modal.Body>
            <form>
                <Selection_Input 
                options={options}
                setInput={setModel}
                input={model}
                lebel_text={"Manufacturer : "}
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
               
                {succMsg}
            </form>
            </Modal.Body>
          <Modal.Footer>
          <BtnDark
                title={"Add"}
                handleClick={handleSubmit}
                />
          </Modal.Footer>
        </Modal>

    )
}