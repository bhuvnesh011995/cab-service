const db = require("../model/index");

exports.addPromoCode = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let promoCode = await db.promoCode.create(obj);
    if (Array.isArray(obj.selectUser) && obj.selectUser.length > 0) {
      obj.selectUser = obj.selectUser[0];
    }
    promoCode = await db.promoCode
      .findById(promoCode._id)
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "selectUser" },
      ]);
    res.status(201).json(promoCode);
  } catch (error) {
    next(error);
  }
};

exports.getAllPromoCode = async function (req, res, next) {
  try {
    const promoCode = await db.promoCode
      .find({})
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "selectUser" },
      ]);
    return res.status(200).json(promoCode);
  } catch (error) {
    next(error);
  }
};

exports.deletePromoCode = async function (req, res) {
  const id = req.params.id;

  try {
    const result = await db.promoCode.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "promoCode not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
