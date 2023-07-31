import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";

let initialState = {
    package:"",
    country:"",
    state:"",
    city:"",
    vehicleType:"",
    status:"",
    packageFare:null,
    minCharge:null,
    perMinCharge:null,
    cancelCharge:null,
    bookingFee:null,
    adminCommissionType:"",
    adminCommission:null,
    perKMCharge:[{minKM:null,maxKM:null,fare:null}]

}
let url = BASE_URL+"/rentalPackage/"
export default function AddRentalFare(){
    const [packages,setPackage] = useState([]);
    const [rentalFare,setRentalFare] = useState(initialState);



    return(
        <Management_container title={"Add Rental Fare"}>
<div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-10">
      <div class="card">
        <div class="card-body">
            <form>
                
                <Filter_Option 
                    input={rentalFare}
                    setInput={setRentalFare}
                    initialInput={initialState}
                    options={["package","country","state","city","vehicleType","status"]}/>
                    

            </form>
            
            </div></div></div></div>

        </Management_container>
    )
}