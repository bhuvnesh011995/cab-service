const db = require("../model/index");

exports.getSettingPage = async function (req, res, next) {
  try {
    let settingPage = await db.setting.findOne({});

    res.status(200).json({
      success: true,
      settingPage: settingPage,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSettingPage = async function (req, res, next) {
  try {
    let obj = req.body;

    let settingPage = await db.setting.updateOne({}, obj);

    res.status(200).json({
      success: true,
      updatedSettingPage: settingPage,
    });
  } catch (error) {
    next(error);
  }
};
