const db = require("../model/index");

exports.addVehicleType = async function (req, res, next) {
  try {
    const {
      img,
      name,
      runModes,
      seatingCapacity,
      seatingCapacityName,
      status,
    } = req.body;

    const runModeIds = [];

    await db.vehicleType.create({
      name: name,
      img: img,
      seatingCapacityName: seatingCapacityName,
      seatingCapacity: seatingCapacity,
      status: status,
      runMode: runModes,
    });

    res.status(200).json({
      success: true,
      message: "vehicle type added with runmodes",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllVehicle = async function (req, res, next) {
  try {
    let vehicleTypes = await db.vehicleType
      .find({})
      .select({ name: 1, _id: 0 })
      .populate({ path: "runMode", select: { name: 1, _id: 0 } });
    res.status(200).json({
      success: true,
      data: vehicleTypes,
    });
  } catch (error) {
    next(error);
  }
};

exports.filterVehicleType = async function (req, res, next) {
  try {
    let { name, runMode } = req.query;

    if (!name && !runMode) {
      var vehicleType = await db.vehicleType
        .find({})
        .select({ name: 1, _id: 0, seatingCapacity: 1, img: 1, status: 1 })
        .populate({ path: "runMode", select: { name: 1, _id: 0 } });
    } else {
      if (runMode) {
        const runModeDoc = await db.runMode.findOne({ name: runMode });
        runMode = runModeDoc._id;
      } else runMode = null;

      vehicleType = await db.vehicleType
        .find({
          $or: [{ name: name }, { runMode: runMode }],
        })
        .select({ name: 1, _id: 0, seatingCapacity: 1, img: 1, status: 1 })
        .populate({ path: "runMode", select: { name: 1, _id: 0 } });
    }

    res.status(200).json({
      success: true,
      data: vehicleType,
    });
  } catch (error) {
    next(error);
  }
};
