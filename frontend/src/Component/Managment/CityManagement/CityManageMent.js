import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import map from "../../img/map.png"
import Filter_Option from "../../Common/Filter_option";
import { useState } from "react";
import Table from "../../Common/Table";

const initialFilter ={
    text:""
}

export default function CityManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();

    function handleClick(e){
        navigate("/addCity")
    }

    function handleSubmit(e){
        e.preventDefault();
        return
    }
    return(
        <Management_container title={"City Management"}>
           <img src={map} alt="map img" style={{width:"90%", marginLeft:"5%",height:'400px'}}/>
           <div
        style={{
          position: "relative",
          left: "80%",
          zIndex: "2",
          margin: "10px",
        }}>
           
            <BtnDark handleClick={handleClick} title={"Add City"} />
      </div>
      <div className="m-3 d-flex" style={{width:"100%",justifyContent:"center"}}>
        <input style={{width:"40%", borderRadius:"30px", margin:"10px"}}  onChange={e=>setFilter(preVal=>({...preVal,text:e.target.value}))}
          type="text"
          placeholder="search..."
          value={filter.text}
        />
        <BtnDark handleClick={handleSubmit} title={"Search"}/>
    </div>
    <Table
        heading={["Sr no", "Name","State","Country", "Status", "Created At", "Action"]}
        list={list}
      />
        </Management_container>
    )
}