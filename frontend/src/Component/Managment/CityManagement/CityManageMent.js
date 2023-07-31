import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import map from "../../img/map.png"
import { useEffect, useState } from "react";
import Table from "../../Common/Table";
import BASE_URL from "../../../config/config";

const initialFilter ={
    text:""
}

export default function CityManagement(){
    const navigate = useNavigate();
    const [filter,setFilter] = useState(initialFilter);
    const [list,setList] = useState();
  let url = BASE_URL+"/city/"
    useEffect(()=>{
      fetch(url,{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
          setList(
            data.cities.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.state}</td>
                  <td>{ele.country}</td>
                  <td>{ele.status}</td>
                  <td>{ele.createdAt}</td>
                  <td>""</td>
                </tr>
              );
            })
          )
        }
      })
    },[])

    function handleClick(e){
      e.preventDefault();
        navigate('/addCity')
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(url+"?text="+filter.text,{
          method:"GET"
        }).then(res=>res.json())
        .then(data=>{
          if(data.success){
            setList(
              data.cities.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.state}</td>
                    <td>{ele.country}</td>
                    <td>{ele.status}</td>
                    <td>{ele.createdAt}</td>
                    <td>""</td>
                  </tr>
                );
              })
            )
          }
        })
    }
    return(
        <Management_container title={"City Management"}>
           <img src={map} alt="map img" style={{width:"90%", marginLeft:"5%",height:'400px'}}/>
           <div class="row">
    <div class="col-lg-13">
      <div class="card">
        <div class="card-body">
    <div style={{display:"flex",justifyContent:"right",zIndex:"2"}}>
           
            <BtnDark handleClick={handleClick} title={"Add City"} />
      </div>
      <div className="m-3 d-flex" style={{width:"100%",justifyContent:"center"}}>
        <input style={{width:"40%", borderRadius:"30px", margin:"10px"}}  onChange={e=>setFilter(preVal=>({...preVal,text:e.target.value}))}
          type="text"
          placeholder="search..."
          value={filter.text}
        />
        <BtnDark handleClick={handleSubmit} title={"Search"}/>
    </div></div></div></div></div>
    <Table
        heading={["Sr no", "Name","State","Country", "Status", "Created At", "Action"]}
        list={list}
      />
        </Management_container>
    )
}