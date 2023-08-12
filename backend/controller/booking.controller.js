const db = require("../model/index");

exports.addBooking = async function (req, res, next) {
  let {
    
    runMode,
    bookingType,
    pickUp,
    drop,
    start,
    end,
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
    timeFare,
    tripFare,
    promocodeDiscount,
    freeRide,
    tollFare,
    taxFare,
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
    vehicle,
  } = req.body;

  let riderDoc = await db.rider({
    
  })

  let runModeDoc = await db.runMode.findOne({ name: runMode });

  if (!runModeDoc) {
    res.status(400).json({
      success: false,
      message: "Run Mode required",
    });
  }
  let countryDoc = await db.country.findOne({ name: country }).populate({
    path: "state",
    model:"State",
    match: { name: state },
    populate: { path: "city", model: "City", match: { name: city } },
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

  const stateId = countryDoc.state[0]._id;
  const cityId = countryDoc.state[0].city[0]._id;


  let booking = await db.booking.create({
        bookingDate:Date.now()
        runMode:runModeDoc._id,
        

  })
};











exports.getAllBooking = async function (req, res, next) {
  let bookings = await db.booking.find({});

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
      { path: "rider", select: { firstName: 1, lastName: 1, email: 1 } },
    ]);
  }

  if (country) {
    let countryDoc = await db.country.findOne({ name: country });

    if (countryDoc) var countryId = countryDoc._id;
    else countryId = null;
  } else countryId = null;

  if (state) {
    let stateDoc = await db.state.findOne({ name: country });

    if (stateDoc) var stateId = stateDoc._id;
    else stateId = null;
  } else stateId = null;
  if (city) {
    let cityDoc = await db.country.findOne({ name: country });

    if (cityDoc) var cityId = cityDoc._id;
    else cityId = null;
  } else cityId = null;

  bookings = await db.booking
    .find({
      $or: [
        { "start.address.country": countryId },
        { "start.address.state": stateId },
        { "start.address.city": cityId },
        { bookignType: bookingType },
        { status: status },
      ],
    })
    .populate([
      { path: "runMode", select: { name: 1 } },
      { path: "driver", select: { firstName: 1, lastName: 1 } },
      { path: "rider", select: { firstName: 1, lastName: 1, email: 1 } },
    ]);

  res.status(201).json({
    success: true,
    bookings,
  });
};
