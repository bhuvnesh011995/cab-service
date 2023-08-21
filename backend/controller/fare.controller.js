const db = require("../model/index");

exports.getFares = async function (req, res, next) {
  const fareFrom = req.params.fareFrom;

  if (fareFrom == "IndiFareCity") {
    var fares = await db.indiFareCity
      .find({ status: "ACTIVE" })
      .select({
        baseFare: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "vehicleType", select: { name: 1 } },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
        { path: "state", select: { name: 1 } },
        { path: "city", select: { name: 1 } },
      ]);
  } else if (fareFrom == "IndiFareState") {
    fares = await db.indiFareState
      .find({ status: "ACTIVE" })
      .select({
        baseFare: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "vehicleType", select: { name: 1 } },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
        { path: "state", select: { name: 1 } },
      ]);
  } else if (fareFrom == "IndiFareCountry") {
    fares = await db.indiFareCountry
      .find({ status: "ACTIVE" })
      .select({
        baseFare: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "vehicleType", select: { name: 1 } },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
      ]);
  } else if (fareFrom == "RentalFareCity") {
    fares = await db.rentalFareCity
      .find({ status: "ACTIVE" })
      .select({
        package: 1,
        vehicleType: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "package.packageId" },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
        { path: "state", select: { name: 1 } },
        { path: "city", select: { name: 1 } },
      ]);
  } else if (fareFrom == "RentalFareState") {
    fares = await db.rentalFareState
      .find({ status: "ACTIVE" })
      .select({
        package: 1,
        vehicleType: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "package.packageId" },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
        { path: "state", select: { name: 1 } },
      ]);
  } else if (fareFrom == "RentalFareCountry") {
    fares = await db.rentalFareCountry
      .find({ status: "ACTIVE" })
      .select({
        package: 1,
        vehicleType: 1,
        minCharge: 1,
        perMinCharge: 1,
        cancelCharge: 1,
        bookingFee: 1,
        adminCommissionType: 1,
        adminCommission: 1,
      })
      .populate([
        { path: "package.packageId" },
        { path: "perKMCharge" },
        { path: "country", select: { name: 1 } },
      ]);
  }

  res.status(200).json({
    success: true,
    fares,
  });
};
