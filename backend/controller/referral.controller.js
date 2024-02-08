const db = require("../model/index");

exports.addReferral = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let referral = await db.referral.create(obj);
    referral = await db.referral
      .findById(referral._id)
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    res.status(201).json(referral);
  } catch (error) {
    next(error);
  }
};
exports.filterReferal = async function (req, res, next) {
  try {
    const { title, status, forUsers } = req.query;

    if (!title && !status && !forUsers) {
      var referrals = await db.referral.find({});
    } else {
      referrals = await db.referral.find({
        $or: [{ title }, { status }, { forUsers }],
      });
    }

    res.status(200).json({
      success: true,
      referrals,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllReferral = async function (req, res, next) {
  try {
    const referral = await db.referral
      .find({})
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    return res.status(200).json(referral);
  } catch (error) {
    next(error);
  }
};

exports.deleteReferral = async function (req, res) {
  const id = req.params.id;

  try {
    const result = await db.referral.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "referral not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateReferral = async function (req, res) {
  try {
    const { id } = req.params;
    let obj = {};
    if (req.body.name) obj.name = req.body.name;
    if (req.body.country) obj.country = req.body.country;
    if (req.body.state) obj.state = req.body.state;
    if (req.body.city) obj.city = req.body.city;
    if (req.body.forUsers) obj.forUsers = req.body.forUsers;
    if (req.body.status) obj.status = req.body.status;
    let referral = await db.referral.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    referral = await db.referral
      .findById(referral._id)
      .populate([{ path: "country" }, { path: "state" }, { path: "city" }]);
    res.status(200).json(referral);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};
