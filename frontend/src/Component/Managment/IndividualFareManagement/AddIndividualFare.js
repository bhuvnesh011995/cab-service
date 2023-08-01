import Filter_Option from "../../Common/Filter_option";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import { useState } from "react";
import "./AddIndividualFare.css"
import BtnDark from "../../Common/Buttons/BtnDark";
import * as RiIcons from "react-icons/ri"
import { IconContext } from "react-icons";
import BASE_URL from "../../../config/config"

const initialState = {
    country:"",
    state:"",
    city:"",
    vehicleType:"",
    status:"",
    baseFare:"",
    minCharge:'',
    perMinCharge:"",
    cancelCharge:"",
    bookingFee:"",
    adminCommissionType:"",
    adminCommission:'',
    perKMCharge:[{minKM:null,maxKM:null,fare:null}]

}

const url = BASE_URL+"/individualFare/"
export default function AddIndividualFare(){
    const [individualFare,setIndividualFare] =useState(initialState);
    const [succMsg,setSuccMsg]=useState("");


    let list = individualFare?.perKMCharge?.map((ele,i)=>{
        return(
            <IconContext.Provider value={"#fff"}>
            <form>
            <input type="number"
            index={i}
            placeholder="min KM"
            onChange={(e)=>{
                let obj = individualFare
                individualFare.perKMCharge[e.target.getAttribute("index")].minKM = e.target.value
                setIndividualFare(preVal=>
                ({...preVal,...obj
                }))}}
            />

             <input type="number" index={i}
             placeholder="max KM"
            onChange={e=>{
            let obj = individualFare
            individualFare.perKMCharge[e.target.getAttribute("index")].maxKM = e.target.value
            setIndividualFare(preVal=>
            ({...preVal,...obj
            }))}} />

            <input type="number" index={i}
            placeholder="fare" 
            onChange={e=>{
            let obj = individualFare
            individualFare.perKMCharge[e.target.getAttribute("index")].fare = e.target.value
            setIndividualFare(preVal=>
            ({...preVal,...obj
            }))}} /><RiIcons.RiDeleteBin6Line index={i} 
            style={{cursor:"pointer"}}
            onClick={handleDelete} size={"20"} />
    </form></IconContext.Provider>
        )
    })
    


    function handleDelete(e){
        let arr = individualFare.perKMCharge.filter((ele,i)=>{
            if(i!=e.target.getAttribute("index")) return ele
        })
        setIndividualFare(preVal=>({...preVal,perKMCharge:[...arr]}))

    }
    function handleSubmit(e){
        e.preventDefault();
        fetch(BASE_URL+"/individualFare/",{
            method:"POST",
            body:JSON.stringify(individualFare),
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



    function handleClick(e){
        e.preventDefault();
        setIndividualFare(preVal=>({...preVal,perKMCharge:[...preVal.perKMCharge,{minKM:null,maxKM:null,fare:null}]}))
    }
    return(
        
        <Management_container title={"Add New Individual Fare"}>
            <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-10">
      <div class="card">
        <div class="card-body">
                <form>
                    <Filter_Option 
                    input={individualFare}
                    setInput={setIndividualFare}
                    initialInput={initialState}
                    options={["country","state","city","vehicleType","status"]}/>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                    <Text_Input 
                    type={"number"}
                lebel_text={"Base Fare : "}
                setKey={"baseFare"}
                setInput={setIndividualFare}
                />
                 <Text_Input 
                 type={"number"}
                lebel_text={"Min Charge : "}
                setKey={"minCharge"}
                setInput={setIndividualFare}
                />
                 <Text_Input 
                 type={"number"}
                lebel_text={"Per Min Charge : "}
                setKey={"perMinCharge"}
                setInput={setIndividualFare}
                />
                 <Text_Input 
                 type={"number"}
                lebel_text={"Cancel Charge : "}
                setKey={"cancelCharge"}
                setInput={setIndividualFare}
                />
                 <Text_Input 
                 type={"number"}
                lebel_text={"Booking Fee : "}
                setKey={"bookingFee"}
                setInput={setIndividualFare}
                />
                <Selection_Input 
                options={["FIX","PERCENTAGE"]}
                setInput={setIndividualFare}
                input={individualFare}
                lebel_text={"Admin Commission Type : "}
                setKey={"adminCommissionType"}
                />
                <Text_Input 
                type={"number"}
                lebel_text={"Admin Commission : "}
                setKey={"adminCommission"}
                setInput={setIndividualFare}
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
            </div></div></div></div>
            
        </Management_container>
    )
}