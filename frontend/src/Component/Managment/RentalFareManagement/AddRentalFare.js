import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Filter_Option from "../../Common/Filter_option";
import BASE_URL from "../../../config/config";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";
import { IconContext } from "react-icons";
import * as RiIcons from "react-icons/ri"

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
    const [rentalFare,setRentalFare] = useState(initialState);
    const [succMsg,setSuccMsg]=useState("");

    let list = rentalFare?.perKMCharge?.map((ele,i)=>{
        return(
            <IconContext.Provider value={"#fff"}>
            <form>
            <input type="number"
            index={i}
            placeholder="min KM"
            onChange={(e)=>{
                let obj = rentalFare
                rentalFare.perKMCharge[e.target.getAttribute("index")].minKM = e.target.value
                setRentalFare(preVal=>
                ({...preVal,...obj
                }))}}
            />

             <input type="number" index={i}
             placeholder="max KM"
            onChange={e=>{
            let obj = rentalFare
            rentalFare.perKMCharge[e.target.getAttribute("index")].maxKM = e.target.value
            setRentalFare(preVal=>
            ({...preVal,...obj
            }))}} />

            <input type="number" index={i}
            placeholder="fare" 
            onChange={e=>{
            let obj = rentalFare
            rentalFare.perKMCharge[e.target.getAttribute("index")].fare = e.target.value
            setRentalFare(preVal=>
            ({...preVal,...obj
            }))}} /><RiIcons.RiDeleteBin6Line index={i} 
            style={{cursor:"pointer"}}
            onClick={handleDelete} size={"20"} />
    </form></IconContext.Provider>
        )
    })
    function handleDelete(e){
        let arr = rentalFare.perKMCharge.filter((ele,i)=>{
            if(i!=e.target.getAttribute("index")) return ele
        })
        setRentalFare(preVal=>({...preVal,perKMCharge:[...arr]}))

    }

    function handleSubmit(){
        fetch(BASE_URL+"/rentalFare/",{
            method:"POST",
            body:JSON.stringify(rentalFare),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
            }
        }).then(res=>res.json())
        .then(data=>{
                if(data.success){
                    setSuccMsg(<span style={{backgroundColor:"lightgreen"}}>{data.message}</span>)
                }else{
                    setSuccMsg(<span style={{backgroundColor:"red"}}>{data.message}</span>)
                }
        })
    }

    function handleClick(e){
        e.preventDefault();
        setRentalFare(preVal=>({...preVal,perKMCharge:[...preVal.perKMCharge,{minKM:null,maxKM:null,fare:null}]}))
    }


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

                <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>

                <Text_Input
                type={"number"}
                lebel_text={"Package Fare :"}
                setKey={"packageFare"}
                setInput={setRentalFare}
                />
                <Text_Input
                input={rentalFare}
                lebel_text={"Minimum Charge :"}
                setKey={"minCharge"}
                setInput={setRentalFare}
                />
                <Text_Input 
                type={"number"}
                lebel_text={"Per Min Charge : "}
                setKey={"perMinCharge"}
                setInput={setRentalFare}
                />
                <Text_Input 
                type={"number"}
                lebel_text={"Cancel Charge : "}
                setKey={"cancelCharge"}
                setInput={setRentalFare}
                />
                <Text_Input 
                type={"number"}
                lebel_text={"Booking Fee : "}
                setKey={"bookingFee"}
                setInput={setRentalFare}
                />
                <Selection_Input 
                options={["FIX","PERCENTAGE"]}
                setInput={setRentalFare}
                input={rentalFare}
                lebel_text={"Admin Commission Type : "}
                setKey={"adminCommissionType"}
                />
                <Text_Input 
                type={"number"}
                lebel_text={"Admin Commission : "}
                setKey={"adminCommission"}
                setInput={setRentalFare}
                />
                <div>Extra Per KM Charge
                   {list}
                    </div>

                    </div>
                     <BtnDark
                    title={"Add More"}
                    handleClick={handleClick}
                    />

            </form>
            
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <BtnDark title={"Add Fare"}
                handleClick={handleSubmit}
                />
                {succMsg}
            </div>
            
            </div></div></div>

        </Management_container>
    )
}