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

exports.getSetting = async (req, res, next) => {
  try {
    let setting = await db.setting.aggregate([{ $match: {} }]);

    if (!setting.length)
      return res
        .status(400)
        .json({ message: "some error while finding setting" });

    res.status(200).json(setting[0]);
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

exports.updateSetting = async (req, res, next) => {
  try {
    let updatedSetting = await db.setting.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedSetting);
  } catch (error) {
    next(error);
  }
};
