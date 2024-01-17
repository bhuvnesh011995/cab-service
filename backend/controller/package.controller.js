const db = require("../model/index");

exports.addPackage = async (req, res) => {
  try {
    console.log("add Package", req.body);
  } catch (err) {
    console.error(err);
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const response = await db.rentalPackage.find({});
    return response;
  } catch (err) {
    console.error(err);
  }
};
