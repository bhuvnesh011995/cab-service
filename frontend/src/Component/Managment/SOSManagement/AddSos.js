import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import AddTollMap from "../TollManagement/AddTollMap";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";

const initialSos = {
    bookingId:"",
    userType:"",
    userId:"",
    description:""
}

const initialMarker = {
    lat:"",
    lng:""
}
export default function AddSos() {
    const [marker,setMarker] = useState(initialMarker)
    const [sos,setSos] = useState(initialSos)
    const [bookingList,setBookingList] = useState([])
    const [booking,setBooking] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(BASE_URL+"/booking")
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                let arr = data.bookings.map(ele=>{
                    return {
                        value:ele._id,title:ele._id
                    }
                })
                setBookingList(arr)
            }
        })
    },[])


    useEffect(()=>{
        if(sos.userType && sos.bookingId){
            if(sos.userType === "Rider") setSos(preVal=>({...preVal,userId:booking.rider._id}))
            else if(sos.userType ==="Driver") setSos(preVal=>({...preVal,userId:booking.driver._id}))
            else setSos(preVal=>({...preVal,userId:""}))
        }else setSos(preVal=>({...preVal,userId:""}))
    },[sos.userType])

    useEffect(()=>{
        if(sos.bookingId){
            fetch(BASE_URL+"/booking/"+sos.bookingId)
            .then(res=>res.json())
            .then(data=>{
                setBooking(data.booking)
            })
            .catch(error=>{
                console.log(error)
                setBooking(null)
            })
        }else setBooking(null)
    },[sos.bookingId])


    function handleSubmit(){
        fetch(BASE_URL+"/sos/",{
            method:"POST",
            body:JSON.stringify({...sos,location:marker}),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.success){
                navigate(-1)
            }
        })
    }



    return(
        <Management_container title={"Add SOS"}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                        
                            <AddTollMap marker={marker} setMarker={setMarker} />
                            <div className="row">
                            <div className="col-md-4">
                            <SelectWithValue reset={["userId","userType"]} input={sos} setInput={setSos} label={"Booking ID"} options={bookingList} setKey={"bookingId"}/>

                            </div>
                            <div className="col-md-4">
                            <SelectWithValue input={sos} setInput={setSos} label={"User Type"} setKey={"userType"} options={[{value:"Rider",title:"Rider"},{value:"Driver",title:"Driver"}]} />

                            </div>
                            <div className="col-md-4">
                            <div className="m-3">
                            <label className="form-label">User Id</label>
                            <input 
                                style={{width:"200px"}}
                                className="form-control"
                                disabled
                                type={"text"}
                                placeholder={"user ID"}
                                value={sos.userId}
                            />
                        </div>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        
                                        <label className="col-md-3 ms-3">Latitude</label>
                                        
                                        
                                        <input className="col-md-6" placeholder="latitude" disabled value={marker.lat} />
                                        </div></div>
                                        <div className="col-md-6">
                                        <div className="row">
                                        
                                        <label className="col-md-3 ms-3">Longitude</label>
                                        
                                       
                                        <input className="col-md-6" placeholder="longitude" disabled value={marker.lng} />
                                        </div>
                                    </div>
                                    
                                
                            </div>

                            <div className="row">
                            <label className="form-label ms-3">Description:</label>
                                <textarea onChange={(e)=>setSos(preVal=>({...preVal,description:e.target.value}))} className="ms-4 w-50" rows={4}></textarea>
                            </div>

                            <div>
                            <BtnDark handleClick={handleSubmit} title={"Add SOS"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Management_container>
    )
};
