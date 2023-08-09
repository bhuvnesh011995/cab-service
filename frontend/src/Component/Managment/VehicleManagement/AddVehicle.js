import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import BASE_URL from "../../../config/config";

export default function AddVehicle(){
    const [vehicletypeOption,setVehicletypeOption] = useState();

    useEffect(()=>{
        fetch(BASE_URL+"/vehicletype/",{
            method:"GET"
          }).then(res=>res.json())
        //   .then(data=>{
        //     let arr = [];
        //     data?.data?.map(ele=>arr.push(ele.name)
        //     setVehicletypeOption(arr)
            
        //     )
        //   })
    },[])
    return(
        <Management_container title={"Vehicle Form"}>
            <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-lg-10">
          <div class="card">
            <div class="card-body">
            <form className="d-flex justify-content-space-around flex-wrap">

            </form>
                
                </div></div></div></div>
        </Management_container>
    )
}