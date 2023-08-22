import { useLocation } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import { useEffect, useState } from "react";
import BASE_URL from "../../../config/config";
import BookingContent from "./BookingContent";

export default function BookingDetails() {
    const {state} = useLocation();
    const [booking,setBooking] = useState(null)
    useEffect(()=>{
        fetch(BASE_URL+"/booking/"+state.bookingId,{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>setBooking(data.booking))
    },[])
  return (
    <>
      <Management_container title={"Booking Details"}>
        <div class="row">
          <div class="col-lg-13">
            <div class="card">
              <div class="card-body">
              <BookingContent booking={booking} />
              </div>
            </div>
          </div>
        </div>
      </Management_container>
    </>
  );
}
