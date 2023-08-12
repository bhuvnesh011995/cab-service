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
      message: "make added",
      name: make.name,
      status: make.status,
    });
  } catch (e) {
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
      make = await Make.find({ $or: [{ name: name }, { status: status }] }).lean();
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


exports.getall = async function (req,res,next){
  let a = await Make.find({}).select({name:1,_id:0}).lean()

  res.status(200).json(a)
}