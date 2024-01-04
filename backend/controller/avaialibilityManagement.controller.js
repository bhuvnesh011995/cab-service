const Avaialibility = require("../model/avaialibilityManagement.model");

exports.avaialibilityManagement = async function (req, res, next) {
  let { city, country, state, pinCodeMapping } = req.body;
  console.log(req.body);

  try {
    const avaialibilityManagement = await Avaialibility.create({
      city: city,
      country: country,
      state: state,
      pinCodeMapping: pinCodeMapping,
    });

    res.status(201).json({
      success: true,
      message: "avaialibility added",
      city: avaialibilityManagement.city,
      country: avaialibilityManagement.country,
      state: avaialibilityManagement.state,
      pinCodeMapping: avaialibilityManagement.pinCodeMapping,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error happen",
      error: e.message,
    });
  }
};

exports.getAvaialibility = async function (req, res, next) {
  try {
    // const avaialibilities = await Avaialibility.find({});
    // return console.log(avaialibilities);

    res.status(200).json({
      success: true,
      message: "Avaialibilities retrieved successfully",
      avaialibilities: avaialibilities,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error happened",
      error: e.message,
    });
  }
};
