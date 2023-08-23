import React, { useState } from 'react';
import Management_container from '../../Common/Management_container';
import Text_Input from '../../Common/Inputs/Text_Input';


const BookingDetail = () => {
  const [booking, setBooking] = useState()
 
    return (
        <Management_container title={"Add Booking"}>

        <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-lg-10">
          <div className="card">
            <div className="card-body">
              <form>
                <div classNameName="d-flex justify-content-space-around flex-wrap">
                <p ></p>
                
                
                
                </div></form></div></div></div></div>
        
        </Management_container>
    );
}

export default BookingDetail;


