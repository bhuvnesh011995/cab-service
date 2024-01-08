const db = require("../model/index");

exports.getWalletBalance = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const userType = req.params.userType;

    if (userType === "rider") {
      var user = await db.rider
        .findOne({ _id: userId })
        .select({ _id: 0 })
        .populate({ path: "wallet", select: "balance" });
    } else if (userType === "driver") {
      user = await db.driver
        .findOne({ _id: userId })
        .select({ _id: 0 })
        .populate({ path: "wallet", select: { balcance: 1 } });
    } else {
      res.status(400).json({
        success: false,
        message: "unknown user Type",
      });
      return;
    }
    // let wallet = await db.wallet.findOne({user:user}).select({balance:1,_id:0})

    res.status(200).json({
      success: true,
      wallet: user.wallet,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBalance = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const userType = req.params.userType;

    const { type, amount, description } = req.body;

    if (userType === "rider") {
      var user = await db.rider
        .findOne({ _id: userId })
        .select({ _id: 0 })
        .populate({ path: "wallet", select: "balance" });
    } else if (userType === "driver") {
      user = await db.driver
        .findOne({ _id: userId })
        .select({ _id: 0 })
        .populate({ path: "wallet", select: { balcance: 1 } });
    } else {
      res.status(400).json({
        success: false,
        message: "unknown user Type",
      });
      return;
    }

    try {
      await db.transaction.create({
        amount,
        type,
        description,
        wallet: user.wallet._id,
      });
    } catch (error) {
      console.log("error occoured", error);
    }

    res.status(200).json({
      success: true,
      message: `${type} transaction done of amount ${amount} in your wallet`,
    });
  } catch (error) {
    next(error);
  }
};
