const db = require("../model/index");

exports.addManufacturer = async function (req, res, next) {
  try {
    let manufacturer = await db.manufacturer.create(req.body);
    res.status(201).json(manufacturer);
  } catch (error) {
    next(error);
  }
};

exports.getAllManufacturer = async function (req, res, next) {
  try {
    const manufacturer = await db.manufacturer
      .find({})
      .populate({ path: "model", select: "name" });
    return res.status(200).json({
      success: true,
      manufacturer: manufacturer,
      message: "get manufacturer",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: false,
      error: error.message,
    });
  }
};

exports.updatemanufacturer = async function (req, res, next) {
  try {
    const { id } = req.params;

    let obj = {};

    if (req.body.name) obj.name = req.body.name;
    if (req.body.status) obj.status = req.body.status;
    if (req.body.model) obj.model = req.body.model;
    let manufacturer = await db.manufacturer.findOneAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "update successfully", manufacturer: manufacturer });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};

exports.deleteManufacturer = async function (req, res, next) {
  let { id } = req.params;
  console.log("make id is", req.params);

  try {
    const deletedMake = await db.manufacturer.deleteOne({ _id: id });

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

exports.filterManufacturer = async (req, res, next) => {
  try {
    const { name, status } = req.query;
    let query = [{ $match: { $or: [] } }];
    if (name)
      query[0].$match.$or.push({ name: { $regex: name, $options: "i" } });
    if (status)
      query[0].$match.$or.push({ status: { $regex: status, $options: "i" } });
    if (!query[0].$match.$or.length) query[0].$match = {};
    let manufacturer = await db.manufacturer.aggregate(query);
    res.status(200).json(manufacturer);
  } catch (error) {
    next(error);
  }
};
