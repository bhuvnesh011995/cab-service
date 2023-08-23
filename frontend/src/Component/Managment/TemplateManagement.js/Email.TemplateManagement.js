import { useState } from "react";
import BtnDark from "../../Common/Buttons/BtnDark";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import { useNavigate } from "react-router-dom";
const initialfilter = {
    title:"",
    status:"",
    forUsers:""
}
export default function EmailTemplateManagement() {
    const [filter,setFilter] =useState(initialfilter)
    const navigate = useNavigate()

function handleClick(){
    navigate("/addEmailTemplate")
}
    function handleSubmit(e){
        e.preventDefault();

        return
    }
  return (
    <Management_container title={"Email Template"}>
      <div class="row">
        <div class="col-lg-13">
          <div class="card">
            <div class="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  zIndex: "2",
                }}
              >
                <BtnDark handleClick={handleClick} title={"Add New"} />
              </div>

              <form className="m-2" onSubmit={handleSubmit}>
              
              <div className="row">
                <div className="col-lg-2 d-flex w-100 justufy-content-around align-items-center">
                    <Text_Input input={filter} setInput={setFilter} lebel_text={"Title"} setKey={"title"} />
                    <Selection_Input options={["ADMIN","DRIVER","RIDER"]} input={filter} setInput={setFilter} lebel_text={"For Users"} setKey={"forUsers"} />
                    <Selection_Input options={["ACTIVE","INACTIVE"]} input={filter} setInput={setFilter} lebel_text={"Status :"} setKey={"status"} />
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
