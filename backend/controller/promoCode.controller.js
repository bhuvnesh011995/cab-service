const db = require("../model/index");

exports.addPromoCode = async function (req, res, next) {
  let obj = { ...req.body };
  console.log(obj);
  try {
    let promoCode = await db.promoCode.create(obj);
    promoCode = await db.promoCode
      .findById(promoCode._id)
      .populate("country")
      .populate("state")
      .populate("city")
      .populate("vehicleType")
      .populate("selectUser");

    console.log(promoCode);

    res.status(201).json(promoCode);
  } catch (error) {
    next(error);
  }
};
