import { useNavigate } from "react-router-dom";
import BtnDark from "../../Common/Buttons/BtnDark";
import Management_container from "../../Common/Management_container";
import Table from "../../Common/Table";
import { useEffect, useState } from "react";
import BASE_URL from "../../../config/config";


const initialFilter ={
    text:""
}
export default function PageManagement() {
    const navigate = useNavigate();
    const [list,setList] = useState();
    const [filter,setFilter]= useState(initialFilter);
    useEffect(()=>{
        fetch(BASE_URL+"/page",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                setList(
                  data.pages.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.metaDescription}</td>
                        <td>{ele.metaKey}</td>
                        <td>{ele.createdAt}</td>
                        <td>""</td>
                      </tr>
                    );
                  })
                )
              }
        })
    },[])

    function handleClick(){
        navigate("/addPage")
    }

    function handleSubmit(){
        fetch(BASE_URL+"/page/filter/?search="+filter.text,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                setList(
                  data.pages.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.metaDescription}</td>
                        <td>{ele.metaKey}</td>
                        <td>{ele.createdAt}</td>
                        <td>""</td>
                      </tr>
                    );
                  })
                )
              }
        })
    }
  return (
    <Management_container title={"Page Management"}>
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
                <BtnDark handleClick={handleClick} title={"Add City"} />
              </div>
              <div className="m-3 d-flex" style={{width:"100%",justifyContent:"center"}}>
        <input style={{width:"40%", borderRadius:"30px", margin:"5px"}}  onChange={e=>setFilter(preVal=>({...preVal,text:e.target.value}))}
          type="text"
          placeholder="search..."
          value={filter.text}
        />
        <BtnDark handleClick={handleSubmit} title={"Search"}/>
    </div>
             
            </div>
          </div>
        </div>
      </div>
       <Table
                heading={["Sr no", "Name","Meta Description","Meta Key", "Created At", "Action"]}
                list={list}
      />
    </Management_container>
  );
}
