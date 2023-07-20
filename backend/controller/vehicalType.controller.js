const db = require("../model/index");

exports.addVehicalType = async function (req, res, next) {
  const { img, name, runModes, seatingCapacity, seatingCapacityName, status } =
    req.body;

  const runModeIds = [];

  for (let i = 0; i < runModes.length; i++) {
    const runMode = await db.runMode.findOne({ name: runModes[i] });
    runModeIds.push(runMode._id);
  }

  await db.vehicalType.create({
    name: name,
    img: img,
    seatingCapacityName: seatingCapacityName,
    seatingCapacity: seatingCapacity,
    status: status,
    runMode: runModeIds,
  });

  res.status(200).json({
    success: true,
    message: "vehical type added with runmodes",
  });
};

exports.getAllVehicle = async function (req, res, next) {
  let vehicleTypes = await db.vehicalType
    .find({})
    .select({ name: 1, _id: 0 })
    .populate({ path: "runMode", select: { name: 1, _id: 0 } });
  res.status(200).json({
    success: true,
    data: vehicleTypes,
  });
};

exports.filterVehicleType = async function (req, res, next) {
  let { name, runMode } = req.query;

  if (!name && !runMode) {
    var vehicleType = await db.vehicalType
      .find({})
      .select({ name: 1, _id: 0, seatingCapacity: 1, img: 1, status:1})
      .populate({path:"runMode", select:{name:1,_id:0}});
  }else{
    if (runMode) {
        const runModeDoc = await db.runMode.findOne({name:runMode})
        console.log(runModeDoc)
        runMode= runModeDoc._id;
  }else runMode = null;

  console.log(runMode)
  vehicleType= await db.vehicalType.find({
    $or:[
        {name:name},
        {runMode:runMode}
    ]
  })
  .select({ name: 1, _id: 0, seatingCapacity: 1, img: 1, status:1})
  .populate({path:"runMode", select:{name:1,_id:0}});


  }

  res.status(200).json({
    success:true,
    data:vehicleType
  })
  
};
