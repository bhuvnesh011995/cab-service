import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import AddTollMap from "../TollManagement/AddTollMap";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import BASE_URL from "../../../config/config";
import BtnDark from "../../Common/Buttons/BtnDark";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const initialSos = {
  bookingId: "",
  userType: "",
  userId: "",
  description: "",
};

const initialMarker = {
  lat: "",
  lng: "",
};
export default function AddSos({ show, setShow, id, viewSOS }) {
  const [marker, setMarker] = useState(initialMarker);
  const [sos, setSos] = useState(initialSos);
  const [bookingList, setBookingList] = useState([]);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    // fetch(BASE_URL+"/booking")
    // .then(res=>res.json())
    // .then(data=>{
    //     if(data.success){
    //         let arr = data.bookings.map(ele=>{
    //             return {
    //                 value:ele._id,title:ele._id
    //             }
    //         })
    //         setBookingList(arr)
    //     }
    // })
  }, []);

  // useEffect(()=>{
  // if(sos.userType && sos.bookingId){
  //     if(sos.userType === "Rider") setSos(preVal=>({...preVal,userId:booking.rider._id}))
  //     else if(sos.userType ==="Driver") setSos(preVal=>({...preVal,userId:booking.driver._id}))
  //     else setSos(preVal=>({...preVal,userId:""}))
  // }else setSos(preVal=>({...preVal,userId:""}))
  // },[sos.userType])

  // useEffect(()=>{
  //     if(sos.bookingId){
  //         fetch(BASE_URL+"/booking/"+sos.bookingId)
  //         .then(res=>res.json())
  //         .then(data=>{
  //             setBooking(data.booking)
  //         })
  //         .catch(error=>{
  //             console.log(error)
  //             setBooking(null)
  //         })
  //     }else setBooking(null)
  // },[sos.bookingId])

  // function handleSubmit(){
  //     fetch(BASE_URL+"/sos/",{
  //         method:"POST",
  //         body:JSON.stringify({...sos,location:marker}),
  //         headers:{
  //             "Content-type":"application/json; charset=UTF-8"
  //         }
  //     }).then(res=>res.json())
  //     .then(data=>{
  //         if(data.success){
  //             navigate(-1)
  //         }
  //     })
  // }

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Modal show={show} size='lg' onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add SOS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
                <AddTollMap marker={marker} setMarker={setMarker} />
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='m-3'>
                      <label className='form-label'>Booking ID</label>
                      <select
                        style={{ width: "200px" }}
                        {...register("bookingId")}
                        className='form-select'
                      >
                        <option value=''>select</option>
                        <option value='USERID'>User Id</option>
                        <option value='USERTYPE'>User Type</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='m-3'>
                      <label className='form-label'>User Type</label>
                      <select
                        style={{ width: "200px" }}
                        {...register("userType")}
                        className='form-select'
                      >
                        <option value=''>select</option>
                        <option value='Rider'>Rider</option>
                        <option value='Driver'>Driver</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='m-3'>
                      <label className='form-label'>User Id</label>
                      <input
                        style={{ width: "200px" }}
                        className='form-control'
                        disabled
                        type={"text"}
                        placeholder={"user ID"}
                        value={sos.userId}
                        {...register("userId")}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label className='col-md-3 ms-3'>Latitude</label>

                      <input
                        className='col-md-6'
                        placeholder='latitude'
                        disabled
                        value={marker.lat}
                        {...register("lat")}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='row'>
                      <label className='col-md-3 ms-3'>Longitude</label>

                      <input
                        className='col-md-6'
                        placeholder='longitude'
                        disabled
                        value={marker.lng}
                        {...register("lng")}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <label className='form-label ms-3'>Description:</label>
                  <textarea
                    {...register("description")}
                    className='ms-4 w-50'
                    rows={4}
                  ></textarea>
                </div>

                <div>
                  <button
                    type='submit'
                    className='btn me-3 btn-outline-primary waves-effect waves-light'
                  >
                    Add SOS
                  </button>
                  <button
                    type='submit'
                    className='btn me-3 btn-outline-danger waves-effect waves-light'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
