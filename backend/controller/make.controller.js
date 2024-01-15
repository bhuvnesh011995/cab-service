const Make = require("../model/make.model");

exports.addMake = async function (req, res, next) {
  let { name, status } = req.body;

  try {
    const make = await Make.create({
      name: name,
      status: status,
     
    });

    res.status(201).json({
      success: true,
      message: "manufacture added",
      make 
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error happen",
      error: e.message,
    });
  }
};

exports.getMake = async function (req, res, next) {
  let { name, status } = req.query;
  let make;
  try {
    if (!name && !status) {
      make = await Make.find().lean();
    } else {
      make = await Make.find({
        $or: [{ name: name }, { status: status }],
      }).lean();
    }

    res.status(200).json({
      success: true,
      makeList: make,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error happen",
      error: e.message,
    });
  }
};

// exports.getMake= async function(req,res){
//   try{
//     const make = await Make.find()
//     return res.status(200).json({
//       success: true,
//       message: " vehicleCategory  successfully get",
//       make: make,
//     })
//   }
//   catch(error){
//       console.error(error)
//       return res.status(500).send({
//           error:"Internal Server Error"
//       })
//   }

// }


exports.deleteMakeid = async function (req, res, next) {
  let { id } = req.params;
  console.log("make id is", req.params);

  try {
    const deletedMake = await Make.deleteOne({_id: id });

    if (deletedMake.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: "manufacture deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "manufacture not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some internal error occurred",
      error: e.message,
    });
  }
};

// exports.updaupdateMakeDatateModel = async function(req,res){
//   try{
//     const {id} = req.params
//     console.log(id)
//     console.log(req.body)
//      let obj = {};
//      if(req.body.name) obj.name  = req.body.name
//      if(req.body.make) obj.make  = req.body.make
//      if(req.body.status) obj.status  = req.body.status
//      await Model.updateOne({ _id:id}, { $set: obj});
//      res.status(200).json({message:"update successfully", success: true,data:obj})
//   }
//   catch(error){
//     res.status(500).json({
//       success: false,
//       message: "Internal error occurres"
//     })
//   }
// }

exports.updateMakeData = async (req, res, next) => {
  const data = req.body;

  console.log("fimnal data", data);
  try {
    // Check if newdata is defined
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "New data is missing",
      });
    }
    const updatedManufacturer = await Make.findByIdAndUpdate(req.params.id, data);
    if (updatedManufacturer) {
      return res.status(200).json({
        success: true,
        message: "make data updated successfully",
        data
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "make not found",
      });
    }
  } catch (error) {
    console.error("Error updating admin data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getall = async function (req, res, next) {
  try {
    let a = await Make.find({})

    res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};
