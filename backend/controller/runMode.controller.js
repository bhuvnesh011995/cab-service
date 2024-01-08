const db = require("../model/index");

exports.getAllRunMode = async function (req, res, next) {
  try {
    let runModes = await db.runMode.find({}).lean();

    res.status(200).json({
      success: true,
      data: runModes,
    });
  } catch (error) {
    next(error);
  }
};
