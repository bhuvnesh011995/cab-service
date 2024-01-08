const db = require("../model/index");

exports.addVehicle = async function (req, res, next) {
  try {
    let {
      driverEmail,
      vehicleType,
      fuelType,
      seatingCapacityName,
      seatingCapacity,
      make,
      registration,
      insurance,
      permit,
      pollutionCertificate,
      plateNo,
      status,
      verified,
      model,
      year,
      color,
    } = req.body;

    let admin = await db.admin.findOne({ username: "admin" });

    let driver = await db.driver.findOne({ email: driverEmail });

    let vehicletype = await db.vehicleType.findOne({ name: vehicleType });

    let vehicleMake = await db.make.findOne({ name: make });

    let vehicle = await db.vehicle.create({
      driver: driver._id,
      vehicleType: vehicletype._id,
      fuelType: fuelType,
      seatingCapacityName: seatingCapacityName,
      seatingCapacity: seatingCapacity,
      make: vehicleMake._id,
      "registration.number": registration.number,
      "registration.expiryDate": registration.expiryDate,
      "registration.verified": registration.verified,
      "registration.verifiedBy": registration.verified ? admin._id : undefined,
      "insurance.expiryDate": insurance.expiryDate,
      "insurance.verified": insurance.verified,
      "insurance.verifiedBy": insurance.verified ? admin._id : undefined,
      "permit.expiryDate": permit.expiryDate,
      "permit.verified": permit.verified,
      "permit.verifiedBy": permit.verified ? admin._id : undefined,
      "pollutionCertificate.expiryDate": pollutionCertificate.expiryDate,
      "pollutionCertificate.verified": pollutionCertificate.verified,
      "pollutionCertificate.verifiedBy": pollutionCertificate.verified
        ? admin._id
        : undefined,
      plateNo: plateNo,
      status: status,
      verified: verified,
      verifiedBy: verified ? admin._id : undefined,
      model: model,
      year: year,
      color: color,
    });

    let update = await db.driver.findByIdAndUpdate(driver._id, {
      $push: { vehicle: vehicle._id },
    });

    res.status(201).json({
      success: true,
      message: "vehicle added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllVehicle = async function (req, res, next) {
  try {
    let vehicles = await db.vehicle.find({});

    res.status(200).json({
      success: true,
      vehicles: vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, messgae: "error occured" });
  }
};

exports.getVehicleByDriver = async function (req, res, next) {
  try {
    let driver = await db.driver.findById(req.params.driverId);

    let vehicles = await db.vehicle.find({ driver: driver._id }).populate([
      { path: "vehicleType", select: "name" },
      { path: "make", select: "name" },
    ]);

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

exports.getVehicleDetails = async function (req, res, next) {
  try {
    let vehicleId = req.params.vehicleId;

    let vehicle = await db.vehicle.findById(vehicleId).populate([
      { path: "vehicleType", select: { name: 1 } },
      { path: "make", select: { name: 1 } },
      { path: "verifiedBy", select: { name: 1 } },
    ]);

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

exports.getActiveVehicleOfDriver = async function (req, res, next) {
  try {
    let vehicles = await db.vehicle
      .find({
        driver: req.params.driverId,
        "registration.expiryDate": { $gt: Date.now() },
        "registration.verified": true,
        "insurance.expiryDate": { $gt: Date.now() },
        "insurance.verified": true,
        "permit.verified": true,
        "permit.expiryDate": { $gt: Date.now() },
        "pollutionCertificate.expiryDate": { $gt: Date.now() },
        "pollutionCertificate.verified": true,
        status: "ACTIVE",
        verified: true,
      })
      .select({
        fuelType: 1,
        model: 1,
        year: 1,
        color: 1,
        plateNo: 1,
      })
      .populate({ path: "make", select: { name: 1, _id: 0 } });

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};
