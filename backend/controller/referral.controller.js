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
  console.log(req.body);
  try {
    const { id } = req.params;
    let obj = {};
    if (req.body.name) obj.name = req.body.name;
    if (req.body.country) obj.country = req.body.country;
    if (req.body.state) obj.state = req.body.state;
    if (req.body.city) obj.city = req.body.city;
    if (req.body.forUsers) obj.forUsers = req.body.forUsers;
    if (req.body.status) obj.status = req.body.status;
    if (req.body.freeRideToReferrer)
      obj.freeRideToReferrer = req.body.freeRideToReferrer;
    if (req.body.maxFreeRideToReferrer)
      obj.maxFreeRideToReferrer = req.body.maxFreeRideToReferrer;
    if (req.body.amountToReferrer)
      obj.amountToReferrer = req.body.amountToReferrer;
    if (req.body.maxAmountToReferrer)
      obj.maxAmountToReferrer = req.body.maxAmountToReferrer;
    if (req.body.freeRideToApplier)
      obj.freeRideToApplier = req.body.freeRideToApplier;
    if (req.body.amountToApplier)
      obj.amountToApplier = req.body.amountToApplier;

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

exports.filterReferral = async (req, res, next) => {
  try {
    let { name, country, state, city } = req.query;
    let query = [
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "country",
        },
      },
      { $unwind: "$country" },
      {
        $lookup: {
          from: "State",
          localField: "state",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "state",
        },
      },
      { $unwind: "$state" },
      {
        $lookup: {
          from: "City",
          localField: "city",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "city",
        },
      },
      { $unwind: "$city" },
    ];

    let matchStage = { $match: { $or: [] } };
    if (name)
      matchStage.$match.$or = [{ name: { $regex: name, $options: "i" } }];
    if (country)
      matchStage.$match.$or.push({
        "country.name": { $regex: country, $options: "i" },
      });
    if (state) {
      matchStage.$match.$or.push({
        "state.name": { $regex: state, $options: "i" },
      });
      console.log(state);
    }
    if (city)
      matchStage.$match.$or.push({
        "city.name": { $regex: city, $options: "i" },
      });
    if (matchStage.$match.$or && matchStage.$match.$or.length > 0) {
      query.push(matchStage);
    }

    query.push({
      $project: {
        name: 1,
        country: 1,
        state: 1,
        city: 1,
        status: 1,
        freeRideToReferrer: 1,
        createdAt: 1,
        forUsers: 1,
        maxFreeRideToReferrer: 1,
        amountToReferrer: 1,
        maxAmountToReferrer: 1,
        freeRideToApplier: 1,
        amountToApplier: 1,
      },
    });

    let referral = await db.referral.aggregate(query);
    res.status(200).json(referral);
  } catch (error) {
    next(error);
  }
};
