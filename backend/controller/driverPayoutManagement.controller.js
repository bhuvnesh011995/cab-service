const db = require("../model/index");
exports.addDriverPayout = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let driverPayout = await db.driverPayoutManagement.create(obj);
    res.status(201).json(driverPayout);
  } catch (error) {
    next(error);
  }
};

exports.getAllDriverPayout = async function (req, res, next) {
  try {
    let driverPayout = await db.driverPayoutManagement.find({});
    return res.status(200).json(driverPayout);
  } catch (error) {
    next(error);
  }
};

exports.deleteDriverPayout = async function (req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await db.driverPayoutManagement.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete Successfully", success: true });
    } else {
      return res.status(400).json({ message: "Driver payout Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateDriverPayout = async function (req, res) {
  try {
    const { id } = req.params;
    let obj = {};
    if (req.body.totalDistance) obj.totalDistance = req.body.totalDistance;
    if (req.body.totalTime) obj.totalTime = req.body.totalTime;
    if (req.body.totalFreeRide) obj.totalFreeRide = req.body.totalFreeRide;

    if (req.body.appliedFare) obj.appliedFare = req.body.appliedFare;

    if (req.body.tollFare) obj.tollFare = req.body.tollFare;
    if (req.body.taxFare) obj.taxFare = req.body.taxFare;
    if (req.body.bookingfee) obj.bookingfee = req.body.bookingfee;
    if (req.body.tripCommission) obj.tripCommission = req.body.tripCommission;
    if (req.body.driverTripCommission)
      obj.driverTripCommission = req.body.driverTripCommission;
    if (req.body.promocodeAmount)
      obj.promocodeAmount = req.body.promocodeAmount;
    if (req.body.driveCommission)
      obj.driveCommission = req.body.driveCommission;
    if (req.body.adminCommission)
      obj.adminCommission = req.body.adminCommission;
    let driverPayout = await db.driverPayoutManagement.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );

    res.status(200).json(driverPayout);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};
