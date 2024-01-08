const db = require("../model/index");

exports.addReferral = async function (req, res, next) {
  try {
    const {
      forUsers,
      countryId,
      stateId,
      cityId,
      title,
      status,
      freeRideToReferrer,
      maxFreeRideToReferrer,
      amountToReferrer,
      maxAmountToReferrer,
      freeRideToApplier,
      amountToApplier,
    } = req.body;

    await db.referral.create({
      country: countryId,
      state: stateId,
      city: cityId,
      forUsers,
      title,
      status,
      freeRideToReferrer,
      maxFreeRideToReferrer,
      amountToReferrer,
      maxAmountToReferrer,
      freeRideToApplier,
      amountToApplier,
    });

    res.status(200).json({
      success: true,
      message: "referral created successful",
    });
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
