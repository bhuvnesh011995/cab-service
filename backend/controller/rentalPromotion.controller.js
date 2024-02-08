const db = require("../model/index");

exports.addRentalPromotion = async function (req, res, next) {
  let obj = { ...req.body };
  try {
    let rentalPromotion = await db.rentalPromotion.create(obj);
    if (Array.isArray(obj.selectUser) && obj.selectUser.length > 0) {
      obj.selectUser = obj.selectUser[0];
    }
    rentalPromotion = await db.rentalPromotion
      .findById(rentalPromotion._id)
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "package" },
        { path: "selectUser" },
        { path: "vehicleType" },
      ]);
    res.status(201).json(rentalPromotion);
  } catch (error) {
    next(error);
  }
};

exports.getAllRentalPromotion = async function (req, res, next) {
  try {
    const rentalPromotion = await db.rentalPromotion
      .find({})
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "vehicleType" },
        { path: "package" },
        { path: "selectUser" },
      ]);
    return res.status(200).json(rentalPromotion);
  } catch (error) {
    next(error);
  }
};

exports.deleteRentalPromotion = async function (req, res) {
  const id = req.params.id;

  try {
    const result = await db.rentalPromotion.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Delete successfully", success: true });
    } else {
      return res.status(400).json({ message: "rentalPromotion not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateRentalPromotion = async function (req, res) {
  console.log(req.body);
  try {
    const { id } = req.params;
    let obj = {};
    if (Array.isArray(obj.selectUser) && obj.selectUser.length > 0) {
      obj.selectUser = obj.selectUser[0];
    }
    if (req.body.country) obj.country = req.body.country;
    if (req.body.state) obj.state = req.body.state;
    if (req.body.city) obj.city = req.body.city;
    if (req.body.vehicleType) obj.vehicleType = req.body.vehicleType;
    if (req.body.package) obj.package = req.body.package;
    if (req.body.forUser) obj.forUser = req.body.forUser;
    if (req.body.discountValue) obj.discountValue = req.body.discountValue;
    if (req.body.discountType) obj.discountType = req.body.discountType;
    if (req.body.promoCode) obj.promoCode = req.body.promoCode;
    if (req.body.validFrom) obj.validFrom = req.body.validFrom;
    if (req.body.validTo) obj.validTo = req.body.validTo;
    if (req.body.selectUser) obj.selectUser = req.body.selectUser;
    if (req.body.multipleUser) obj.multipleUser = req.body.multipleUser;

    let rentalPromotion = await db.rentalPromotion.findByIdAndUpdate(
      { _id: id },
      { $set: obj },
      { new: true }
    );
    rentalPromotion = await db.rentalPromotion
      .findById(rentalPromotion._id)
      .populate([
        { path: "country" },
        { path: "state" },
        { path: "city" },
        { path: "vehicleType" },
        { path: "package" },
        { path: "selectUser" },
      ]);
    res.status(200).json(rentalPromotion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};
