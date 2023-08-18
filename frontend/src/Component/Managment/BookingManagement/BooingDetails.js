import React, { useState } from 'react';
import Management_container from '../../Common/Management_container';
import Text_Input from '../../Common/Inputs/Text_Input';


const BookingDetail = () => {
  const [booking, setBooking] = useState()
 
    return (
        <Management_container title={"Add Booking"}>

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
              <form>
                <div className="d-flex justify-content-space-around flex-wrap">
                <p ></p>
                
                
                
                </div></form></div></div></div></div>
        
        </Management_container>
    );
}

export default BookingDetail;


