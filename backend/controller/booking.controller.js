const db = require("../model/index");
const mongoose = require('mongoose')

exports.addBooking = async function (req, res, next) {
  let {
    
    runMode,
    bookingType,
    bookingInfo,
    rideInfo,
    packageId,
    nightCharge,
    peakCharge,
    baseFareId,
    fareFrom,
    travelTime,
    travelDistance,
    extraTravelTime,
    extraTravelDistance,
    KMFare,
    baseFare,
    timeFare,
    tripFare,
    promocodeDiscount,
    freeRide,
    tollFare,
    taxFare,
    walletMoney,
    payableFare,
    finalPayableFare,
    remainingPayableFare,
    driverTripCommission,
    adminTripCommission,
    driverCommission,
    adminCommission,
    driverInHand,
    adminInHand,
    payoutAmount,
    payoutType,
    success,
    status,
    riderId,
    driverId,
    vehicleId,
  } = req.body;


  let runModeDoc = await db.runMode.findOne({ name: runMode });

  if (!runModeDoc) {
    res.status(400).json({
      success: false,
      message: "Run Mode required",
    });
  }
  let countryDoc = await db.country.findOne({ name: bookingInfo.country }).populate({
    path: "state",
    model:"State",
    match: { name: bookingInfo.state },
    populate: { path: "city", model: "City", match: { name: bookingInfo.city } },
  });
  if (!countryDoc.state.length) {
    res.status(501).json({
      success: false,
      message: "no state found",
    });return
  }
  if (!countryDoc.state[0].city.length) {
    res.status(501).json({
      success: false,
      message: "no city found",
    });return
  }

  const countryId = countryDoc._id;
  const stateId = countryDoc.state[0]._id;
  const cityId = countryDoc.state[0].city[0]._id;


  let booking = await db.booking.create({
        runMode:runModeDoc._id,
        bookingType:bookingType,
        "bookingInfo.country":countryId,
        "bookingInfo.state":stateId,
        "bookingInfo.city":cityId,
        "bookingInfo.pickUp.address":bookingInfo.pickUp.address,
        "bookingInfo.pickUp.location.latitude":bookingInfo.pickUp.location.latitude,
        "bookingInfo.pickUp.location.longitude":bookingInfo.pickUp.location.longitude,
        "bookingInfo.drop.address":bookingInfo.drop.address,
        "bookingInfo.drop.location.latitude":bookingInfo.drop.location.latitude,
        "bookingInfo.drop.location.longitude":bookingInfo.drop.location.longitude,
        "bookingInfo.bookingDate":Date.now(),
        "rideInfo.start.location.latitude":rideInfo.start.location.latitude,
        "rideInfo.start.location.longitude":rideInfo.start.location.longitude,
        "rideInfo.start.date":rideInfo.start.date,
        "rideInfo.end.location.latitude":rideInfo.end.location.latitude,
        "rideInfo.end.location.longitude":rideInfo.end.location.longitude,
        "rideInfo.end.date":rideInfo.end.date,
        package:packageId,
        "applicableCharges.baseFare":baseFareId,
        fareFrom:fareFrom,
        "applicableCharges.nightCharge":nightCharge,
        "applicableCharges.peakCharge":peakCharge,
        "bookingSummery.travelTime":travelTime,
        "bookingSummery.travelDistance":travelDistance,
        "bookingSummery.extraTravelTime":extraTravelTime,
        "bookingSummery.extraTravelDistance":extraTravelDistance,
        "bookingSummery.baseFare":baseFare,
        "bookingSummery.KMFare":KMFare,
        "bookingSummery.timeFare":timeFare,
        "bookingSummery.nightFare":nightCharge,
        "bookingSummery.peakFare":peakCharge,
        "bookingSummery.tripFare":tripFare,
        "bookingSummery.promocodeDiscount":promocodeDiscount,
        "bookingSummery.freeRide":freeRide,
        "bookingSummery.tollFare":tollFare,
        "bookingSummery.taxFare":taxFare,
        "bookingSummery.payableFare":payableFare,
        "bookingSummery.walletMoney":walletMoney,
        "bookingSummery.finalPayableFare":finalPayableFare,
        "bookingSummery.remainingPayableFare":remainingPayableFare,
        "distributionInfo.driverTripCommission":driverTripCommission,
        "distributionInfo.adminTripCommission":adminTripCommission,
        "distributionInfo.driverCommission":driverCommission,
        "distributionInfo.adminCommission":adminCommission,
        "distributionInfo.driverInHand":driverInHand,
        "distributionInfo.adminInHand":adminInHand,
        "distributionInfo.payoutAmount":payoutAmount,
        "distributionInfo.payoutType":payoutType,
        status:status,
        success:success,
        rider:riderId,
        driver:driverId,
        vehicle:vehicleId
  })


  res.status(200).json({
    success:true,
    booking
  })
};


exports.getAllBooking = async function (req, res, next) {
  let bookings = await db.booking.find({}).select("_id");

  res.status(200).json({
    success: true,
    bookings,
  });
};

exports.filterBooking = async function (req, res, next) {
  let { country, state, city, status, bookingType } = req.query;


  if (!country && !state && !city && !status && !bookingType) {
    var bookings = await db.booking.find({}).populate([
      { path: "runMode", select: { name: 1 } },
      { path: "driver", select: { firstName: 1, lastName: 1 } },
      { path: "rider", select: { firstName: 1, lastName: 1, email: 1,  mobile:1 } },
    ]);
  }else{
    if (country) {
      var countryDoc = await db.country.findOne({ name: country });
  
      if (countryDoc) var countryId = countryDoc._id;
      else countryId = null;
    } else countryId = null;
  
      var states = await db.state.find({ name: state });
  
      var cities = await db.city.find({ name: city });
  
  
    bookings = await db.booking
      .find({
        $or: [
          { "bookingInfo.country": countryId },
          { "bookingInfo.state": {$in:states} },
          { "bookingInfo.city": {$in:cities} },
          { bookingType: bookingType },
          { status: status },
        ],
      })
      .populate([
        { path: "runMode", select: { name: 1 } },
        { path: "driver", select: { firstName: 1, lastName: 1 } },
        { path: "rider", select: { firstName: 1, lastName: 1, email: 1, mobile:1 } },
      ]);
  }

  

  res.status(201).json({
    success: true,
    bookings,
  });
};



exports.getBookingDetailsById = async function (req,res,next){
  let id = req.params.bookingId

  let booking = await db.booking.findOne({_id:id}).populate([
    {path:"runMode",model:"RunMode"},
    {path:"bookingInfo.country",model:"Country",select:{name:1}},
    {path:"bookingInfo.state",model:"State",select:{name:1}},
    {path:"bookingInfo.city",model:"City",select:{name:1}},
    {path:"package",model:"RentalPackage"},
    {path:"applicableCharges.baseFare",populate:{path:"perKMCharge"}},
    {path:"rider",model:"Rider"},
    {path:"driver",model:"Driver"},
    {path:"vehicle", model:"Vehicle",populate:[{path:"vehicleType",model:"VehicleType"},{path:"make",model:"Make"}]}

  ])

  res.status(200).json({
    success:true,
    booking
  })
}