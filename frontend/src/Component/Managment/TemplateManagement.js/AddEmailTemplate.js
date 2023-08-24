import { useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import Select from "react-select"

const forUsersOption = [
  {value:"ADMIN",label:"Admin"},
  {value:"DRIVER",label:"Driver"},
  {value:"RIDER",label:"Rider"},
]
const initialTemplate = {
  title: "",
  status: "",
  forUsers: [],
  subject: "",
};
export default function AddEmailTemplate() {
  const [template, setTemplate] = useState(initialTemplate);
  const [body,setBody] = useState("")
  const navigate = useNavigate();

  function handleSubmit(){
    fetch(BASE_URL+"/template/email/",{
      method:"POST",
      body:JSON.stringify({...template,body}),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(res=>res.json())
    .then(data=>{
      if(data.success){
        console.log(data.message)
        navigate(-1)
      }else console.log("error occered")
    }).catch((error)=>console.log("error", error))
  }


  function handleSelect(e){
    let arr = e.map(ele=>ele.value)
    setTemplate(preVal=>({...preVal,forUsers:arr}))
  }


  return (
    <Management_container title={"Create Email Template"}>
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
                  input={template}
                  setInput={setTemplate}
                  lebel_text={"Title"}
                  setKey={"title"}
                />
                <div className="m-3 w-60">
                  <label className="form-label">Subject :</label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setTemplate((preVal) => ({
                        ...preVal,
                        subject: e.target.value,
                      }))
                    }
                    type={"text"}
                    placeholder={"Enter Subject ..."}
                  />
                </div>
                <label className="ms-3 mb-0">For Users</label>
                <Select className="basic-multi-select m-3" classNamePrefix="select" isMulti options={forUsersOption} onChange={handleSelect} />
                <Selection_Input options={["ACTIVE","INACTIVE"]} input={template} setInput={setTemplate} setKey={"status"} lebel_text={"Status :"} />
                <ReactQuill value={body} onChange={setBody} />
                <BtnDark handleClick={handleSubmit} title={"Add Template"} />
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
