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
      name: make.name,
      status: make.status,
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
    const deletedMake = await Make.deleteOne({ id: id });

    if (deletedMake.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Make deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Make not found",
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

exports.updateMakeData = async (req, res, next) => {
  const { id, newdata } = req.body;
  console.log("fimnal data", id);
  try {
    // Check if newdata is defined
    if (!newdata) {
      return res.status(400).json({
        success: false,
        message: "New data is missing",
      });
    }
    // Use updateOne method to update a specific document by _id
    const updatedAdmin = await Make.findByIdAndUpdate(id, newdata);
    if (updatedAdmin) {
      return res.status(200).json({
        success: true,
        message: "make data updated successfully",
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
