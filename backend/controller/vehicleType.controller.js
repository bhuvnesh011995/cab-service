const db = require("../model/index");

exports.addVehicleType = async function (req, res, next) {
  try {
    if (req.file) req.body.file = req.file.filename;

    let vehicleType = await db.vehicleType.create(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle type added",
      vehicleType: vehicleType,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllVehicle = async function (req, res, next) {
  try {
    let vehicleTypes = await db.vehicleType
      .find({})
      .select({ name: 1 })
      .populate({ path: "runMode", select: { name: 1 } });
    res.status(200).json({
      success: true,
      data: vehicleTypes,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.filterVehicleType = async function (req, res, next) {
//   try {
//     let { name, runMode } = req.query;

//     if (!name && !runMode) {
//       var vehicleType = await db.vehicleType
//         .find({})
//         .select({
//           name: 1,
//           seatingCapacity: 1,
//           img: 1,
//           status: 1,
//           seatingCapacityName: 1,
//         })
//         .populate({ path: "runMode", select: { name: 1 } });
//     } else {
//       if (runMode) {
//         const runModeDoc = await db.runMode.findOne({ name: runMode });
//         runMode = runModeDoc._id;
//       } else runMode = null;

//       vehicleType = await db.vehicleType
//         .find({
//           $or: [{ name: name }, { runMode: runMode }],
//         })
//         .select({ name: 1, seatingCapacity: 1, img: 1, status: 1, runMode: 1 });
//     }

//     res.status(200).json({
//       success: true,
//       data: vehicleType,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteVehicleType = async function (req, res) {
  const id = req.params.id;
  console.log(id);

  try {
    const result = await db.vehicleType.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "Model not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllVehicleType = async function (req, res, next) {
  try {
    const vehicleType = await db.vehicleType.find({});
    return res.status(200).json({
      success: true,
      vehicleType: vehicleType,
      message: "get vehicleType",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: false,
      error: error.message,
    });
  }
};

exports.updateVehicleType = async function (req, res, next) {
  try {
    const { id } = req.params;

    let obj = {};

    if (req.body.name) obj.name = req.body.name;
    if (req.body.status) obj.status = req.body.status;
    if (req.body.seatingCapacityName)
      obj.seatingCapacityName = req.body.seatingCapacityName;
    if (req.body.seatingCapacity)
      obj.seatingCapacity = req.body.seatingCapacity;
    if (req.body.runMode) obj.runMode = req.body.runMode;

    let vehicleType = await db.vehicleType.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "update successfully", vehicleType: vehicleType });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};

exports.vehicleTypes = async (req, res, next) => {
  try {
    let vehicleTypes = await db.vehicleType.aggregate([
      { $project: { runMode: 1, name: 1 } },
    ]);
    res.status(200).json(vehicleTypes);
  } catch (error) {
    next(error);
  }
};

exports.filterVehicleType = async (req, res, next) => {
  console.log(req.query);
  try {
    const { name, runMode, seatingCapacityName, seatingCapacity, status } =
      req.query;
    let query = [{ $match: { $or: [] } }];
    if (name)
      query[0].$match.$or.push({
        name: { $regex: name, $options: "i" },
      });
    if (runMode)
      query[0].$match.$or.push({
        runMode: { $regex: runMode, $options: "i" },
      });
    if (seatingCapacityName)
      query[0].$match.$or.push({
        seatingCapacityName: { $regex: seatingCapacityName, $options: "i" },
      });
    if (seatingCapacity)
      query[0].$match.$or.push({
        seatingCapacity: { $regex: seatingCapacity, $options: "i" },
      });
    if (status)
      query[0].$match.$or.push({ status: { $regex: status, $options: "i" } });
    if (!query[0].$match.$or.length) query[0].$match = {};
    let vehicleType = await db.vehicleType.aggregate(query);
    res.status(200).json(vehicleType);
  } catch (error) {
    next(error);
  }
};
