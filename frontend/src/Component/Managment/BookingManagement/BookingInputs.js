import { useEffect, useState } from "react";
import BASE_URL from "../../../config/config";

export default function BookingInputs({ booking, setBooking }) {
  let [driverOption, setDriverOption] = useState([]);
  let [riderOption, setRideOption] = useState([]);
  let [vehicleOption, setVehicleOption] = useState([]);
  let [runMode,setRunMode] = useState([]);
  const [fareFromList,setFareFromList] = useState();
  const [wallet,setWallet] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + "/driver/active", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let list = data.drivers?.map((ele, i) => (
            <option key={i} value={ele._id}>
              {ele?.firstName + " " + ele?.lastName}
            </option>
          ));
          setDriverOption(list);
        }
      });

    fetch(BASE_URL + "/rider/active", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let list = data.riders?.map((ele, i) => (
            <option key={i} value={ele._id}>
              {ele?.firstName + " " + ele?.lastName}
            </option>
          ));
          setRideOption(list);
        }
      });

      fetch(BASE_URL + "/runMode", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let list = data.data?.map((ele, i) => (
            <option key={i} value={ele.name}>
              {ele?.name}
            </option>
          ));
          setRunMode(list);
        }
      });

  }, []);

  useEffect(() => {
    booking.driverId &&
      fetch(BASE_URL + "/vehicle/active/" + booking.driverId, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let list = data.vehicles?.map((ele, i) => (
              <option key={i} value={ele._id}>
                {ele?.model}
              </option>
            ));
            setVehicleOption(list);
          }
        });
  }, [booking.vehicleId]);

  useEffect(() => {
    booking.fareFrom &&
      fetch(BASE_URL + "/fare/" + booking.fareFrom, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            let list = data.fares?.map((ele, i) => (
              <option key={i} value={ele._id}>
                {`${ele.country?.name} ${ele.state?.name} ${ele.city?.name} ${ele.vehicleType?.name}`}
              </option>
            ));
            setFareFromList(list);
          }
        });
  }, [booking.fareFrom]);


  useEffect(() => {
    booking.riderId &&
      fetch(BASE_URL + "/wallet/" + booking.riderId, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
          console.log(data)
          }
        });
  }, [booking.riderId]);


  return (
    <div className="d-flex justify-content-around align-items-center flex-wrap">
      <div className="m-3">
        <label className="form-label">Driver</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({
              ...preVal,
              driverId: e.target.value,
              vehicleId: "",
            }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {driverOption}
        </select>
      </div>

      <div className="m-3">
        <label className="form-label">Rider :</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, riderId: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {riderOption}
        </select>
      </div>

      <div className="m-3">
        <label className="form-label">Vehicle :</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, vehicleId: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {vehicleOption}
        </select>
      </div>

      <div className="m-3">
        <label className="form-label">Run Mode :</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, runMode: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {runMode}
        </select>
      </div>

      <div className="m-3">
        <label className="form-label">Booking Type :</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, bookingType: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          <option value="TYPE1">Type 1</option>
          <option value="TYPE2">Type 2</option>
          <option value="TYPE3">Type 3</option>
          <option value="TYPE4">Type 4</option>
          <option value="TYPE5">Type 5</option>
          <option value="TYPE6">Type 6</option>
        </select>
      </div>

      <div class="m-3">
      <label class="form-label">
        Night Charge
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,nightCharge:e.target.value}))}
          type="number"
          placeholder={"Night Charge"}
          value={booking.nightCharge}
        />
    </div>


    <div class="m-3">
      <label class="form-label">
        Peak Charge
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,peakCharge:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.peakCharge}
        />
    </div>


    <div className="m-3">
        <label className="form-label">Fare From :</label>
        <select
          style={{ width: "200px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, fareFrom: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {
            booking.runMode=="INDIVIDUAL" ? [<option value="IndiFareCity">Individual Fare City</option>,
          <option value="IndiFareState">Individual Fare State</option>,
          <option value="IndiFareCountry"> Individual Fare Country</option>] : booking.runMode ==="RENTAL" ? [<option value="RentalFareCity"> Rental Fare City</option>,
          <option value="RentalFareState">Rental Fare State</option>,
          <option value="RentalFareCountry">Rental Fare Country</option>] : null
          }
        </select>
      </div>


      <div className="m-3">
        <label className="form-label">Type of Fare :</label>
        <select
          style={{ width: "400px" }}
          name="driverId"
          defaultValue={""}
          onChange={(e) => {
            setBooking((preVal) => ({ ...preVal, baseFareId: e.target.value }));
          }}
          className="form-select"
        >
          <option value={""}>Select</option>
          {fareFromList}
        </select>
      </div>


    <div class="m-3">
      <label class="form-label">
        Extra Trvel Time
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,extraTravelTime:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.extraTravelTime}
        />
    </div>

    <div class="m-3">
      <label class="form-label">
        Extra Trvel Distance
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,extraTravelDistance:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.extraTravelDistance}
        />
    </div>


    <div class="m-3">
      <label class="form-label">
        Promo Code Discount
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,promocodeDiscount:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.promocodeDiscount}
        />
    </div>


    <div class="m-3">
      <label class="form-label">
        Toll Fare
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,tollFare:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.tollFare}
        />
    </div>



    <div class="m-3">
      <label class="form-label">
        Tax Fare
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,taxFare:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.taxFare}
        />
    </div>


    <div class="m-3">
      <label class="form-label">
        Extra Trvel Distance
      </label>
        <input class="form-control" onChange={e=>setBooking(preVal=>({...preVal,extraTravelDistance:e.target.value}))}
          type="number"
          placeholder={"Peak Charge"}
          value={booking.extraTravelDistance}
        />
    </div>
    </div>
  );
}
